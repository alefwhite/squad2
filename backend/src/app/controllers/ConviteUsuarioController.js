import sendConfig from '../../config/sendgrid';
import emailService from '../../lib/emailService';
import db from '../../database/connection';
import bcrypt from 'bcryptjs';
import validaCpf from '../../utils/validaCpf';

class ConviteUsuarioController {
     async show(req, res) {
         const id_usuario = req.idUsuario; 

         try {
             const usuarioCodigo = await db("usuario").select("codigo").where('id_usuario', id_usuario).first();
             const url = `${process.env.APP_URL_CONVITE}${usuarioCodigo.codigo}`;
             
             // emailService.send("alefwhite@gmail.com", "Cadastre-se no Squad2", sendConfig.EMAIL_TMPL.replace('{0}', "Squad Dois"));
             return res.json({url});


         } catch (error) {
            return res.status(400).json({ error: "Erro ao gerar url de cadastro!" });
        }


    }
    
    async store(req, res) {
        const { codigo } = req.query
        const { nome, email, senha, cpf, id_cargo} = req.body;        

        if(!codigo) {
            return res.status(401).json({ error: "Não autorizado!"});
        }

        const usuario = await db("usuario").select("id_usuario", ).where("codigo", codigo).first();
        
        if(!usuario) {
            return res.status(401).json({ error: "Código não encontrado!"});
        }

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
           const retorno = await db("usuario").insert({
                nome,
                email,
                senha: senha_hash,
                cpf: cpfValido.cpfUsuario,
                id_criador: usuario.id_usuario,
                id_tipousuario: 3,
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

export default new ConviteUsuarioController();