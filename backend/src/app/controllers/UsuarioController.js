import sendConfig from '../../config/sendgrid';
// import emailService from '../../lib/emailService';
import db from '../../database/connection';
import bcrypt from 'bcryptjs';
import validaCpf from '../../utils/validaCpf';

import emailService from '../../lib/emailService';

class UserController {
     index(req, res) {
         // emailService.send("alefwhite@gmail.com", "Bem vindo a Squad2", sendConfig.EMAIL_TMPL.replace('{0}', "Squad Dois"));

        return res.json();
    }
    
    async store(req, res) {
        const { nome, email, senha, cpf, id_tipousuario, id_cargo, id_status} = req.body;
        
        const cpfValido = validaCpf(cpf);

        if(!cpfValido.valido) {
            return res.status(400).json({ error: "CPF Iválido!"});
        }
        
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

        try {
           const retorno =  await db("usuario").insert({
                nome,
                email,
                senha: senha_hash,
                cpf: cpfValido.cpfUsuario,
                id_tipousuario,
                id_cargo,
                id_status
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

export default new UserController();