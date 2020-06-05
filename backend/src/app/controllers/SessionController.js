import db from '../../database/connection';
import authConfig from '../../config/auth';
import Jwt from 'jsonwebtoken';
import verificaSenha from '../../utils/verificaSenha';

class SessionController {
    async store(req, res) {
        const { email, senha } = req.body;

        const user = await db("usuario").select("*").where("email", email).first();

        if(!user) {
            return res.status(401).json({ error: "Email incorreto!"});
        }

        if(!(await verificaSenha(senha, user.senha))) {
            return res.status(401).json({ error: 'Senha incorreta!' });
        }

        const { id_usuario, nome} = user;
       
        return res.json({
            user: {
                id_usuario,
                nome,
                email
            },
            token: Jwt.sign({ id_usuario }, authConfig.secret, {
                expiresIn: authConfig.expiresIn
            })
        });
    }
}

export default new SessionController();