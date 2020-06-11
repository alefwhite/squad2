import db from '../../database/connection';

class UsuarioTarefaController {

    async store(req,res){
        const {id_usuario, id_tarefa} = req.body;
        const tipoUsuario = req.idUsuario;
    
        if(tipoUsuario === 3){
           return res.json({mensagem:"Não autorizado!"});
        }

        const existeUsuario = await db("usuario").select("*").where({id_usuario}).first();
        if(!existeUsuario){
            return res.json({mensagem:"Usuario inexistente"});
        }
     
        const existeTarefa = await db("tarefa").select("*").where({id_tarefa}).first();
        if(!existeTarefa){
           return res.json({mensagem:"Tarefa inexistente"});
        }

        try{
            const usuarioTarefa = await db("usuario_tarefa").insert({
                id_usuario,
                id_tarefa
            });
            if(usuarioTarefa){
                return res.json({mensagem:"A tarefa foi atribuida ao usuario com sucesso!"});
            }
            else{
                return res.json({mensagem:"Ocorreu algum problema"});
            }
        }
        catch{
            return res.status(500).json({mensagem:"Erro no servidor!"});
        }
    }
}



export default new UsuarioTarefaController();