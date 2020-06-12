import sendConfig from '../../config/sendgrid';
import authConfig from '../../config/auth';
import emailService from '../../lib/emailService';
import db from '../../database/connection';
import bcrypt from 'bcryptjs';
import md5 from 'md5';
import validaCpf from '../../utils/validaCpf';

class UsuarioController {    
    async store(req, res) {
        const { nome, email, senha, cpf, id_cargo, } = req.body;        

        const cpfValido = validaCpf(cpf);

        if(!cpfValido.valido) {
            return res.status(400).json({ error: "CPF Iválido!"});
        }
        
        try {
        
            const existeCpf = await db("usuario")
                .select("cpf")
                .where("usuario.cpf", cpfValido.cpfUsuario)
                .first();

            if(existeCpf) {
                return res.status(400).json({ error: "CPF Já cadastrado!"});
            }

            const existeEmail = await db("usuario")
                .select("email")
                .where("usuario.email", email)
                .first();

            if(existeEmail) {
                return res.status(400).json({ error: "Email Já cadastrado!"});
            }

            const senha_hash = await bcrypt.hash(senha, 8);

        
            const retorno = await db("usuario").insert({
                    nome,
                    email: email.toLowerCase(),
                    senha: senha_hash,
                    cpf: cpfValido.cpfUsuario,
                    codigo: md5(Math.random(0 * 999) + authConfig.SALT_KEY),
                    id_tipousuario: 2,
                    id_cargo,
                
                }) 
                
            if(retorno) {
                emailService.send(email, "Bem vindo a Squad2", sendConfig.EMAIL_TMPL.replace('{0}', nome));
            }

            return res.json({mensagem: "Usuário cadastrado com sucesso!"});
            
        } catch (error) {
            return res.status(400).json({message: "Erro ao cadastrar usuário!"});
        }       

    }


}

export default new UsuarioController();