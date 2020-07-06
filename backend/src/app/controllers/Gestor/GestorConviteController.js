import sendConfig from '../../../config/sendgrid';
import emailService from '../../../lib/emailService';
import db from '../../../database/connection';

class GestorConviteController {
    async store(req, res){
        const id_usuario = req.idUsuario;
        const { email} = req.body;

        if(!email) {
            return res.status(400).json({mensagem: "E-mail obrigatório!"});
        }

        try {
            await db("usuario")
               .select("codigo", "nome")
               .where('id_usuario', id_usuario)
               .first()
               .then((dados) => {

                   if(dados) {        
                       const url = `${process.env.APP_URL_CONVITE}${dados.codigo}`;
               
                       emailService.send(email, "Cadastre-se no InBoard", sendConfig.EMAIL_TMPL2.replace('{0}', dados.nome).replace('{1}', url).replace('{2}', url));
                       return res.json({ mensagem: "Convite enviado com sucesso!"});
                   }

                   return res.status(400).json({ mensagem: "Não foi possível gerar link de convite!"});

               })
               .catch((error) => {
                   console.error(error);

                   return res.status(400).json({ mensagem: "Error ao gera link de convite!" });
               });

        } catch (error) {
           return res.status(500).json({ mensagem: "Erro interno no servidor!" });
       }
    }

    async show(req, res) {
        const id_usuario = req.idUsuario; 

        try {
            await db("usuario")
               .select("codigo")
               .where('id_usuario', id_usuario)
               .first()
               .then((codigo) => {

                   if(codigo) {
                       const url = `${process.env.APP_URL_CONVITE}${codigo.codigo}`;
                       
                       // emailService.send("alefwhite@gmail.com", "Cadastre-se no Squad2", sendConfig.EMAIL_TMPL.replace('{0}', "Squad Dois"));
                       return res.json({url});
                   }

                   return res.status(400).json({ mensagem: "Não foi possível gerar link de convite!"});

               })
               .catch((error) => {
                   console.error(error);

                   return res.status(400).json({ mensagem: "Error ao gera link de convite!" });
               });

        } catch (error) {
           return res.status(500).json({ mensagem: "Erro interno no servidor!" });
       }

   }   
   
    async index(req, res){
        const id_usuario = req.idUsuario;
        const { nome, email, cpf, id_cargo} = req.body;

        try {
            const listaUsuario = await db("usuario").where({
                nome,
                email,
                cpf,
                id_cargo,
                id_usuario : id_usuario
        });

        return res.json(listaUsuario);
            
        } catch (error) {
            return res.status(400).json({ mensagem:`não foi possível listar os usuarios`});        
        }
    }

}

export default new GestorConviteController();