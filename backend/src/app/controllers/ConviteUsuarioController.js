import sendConfig from '../../config/sendgrid';
import emailService from '../../lib/emailService';
import db from '../../database/connection';

class ConviteUsuarioController {
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

     async show(req, res) {
         const id_usuario = req.idUsuario; 

         try {
             await db("usuario")
                .select("codigo")
                .where('id_usuario', id_usuario)
                .first()
                .then((codigo) => {

                    if(codigo) {
                        const url = `${process.env.APP_URL_CONVITE}${usuarioCodigo.codigo}`;
                        
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
    
}

export default new ConviteUsuarioController();