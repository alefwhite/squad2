import db from '../../database/connection';

class UsuarioTarefaController {

    async store(req,res){
        const {id_usuario, id_tarefa} = req.body;
        const tipoUsuario = req.tipoUsuario;
        const id_criador = req.idUsuario;

        if(tipoUsuario === 3){
           return res.json({mensagem:"Não autorizado!"});
        }

        const existeUsuario = await db("usuario").select("*").where({id_usuario}).first();
        if(!existeUsuario){
            return res.json({mensagem:"Usuario inexistente"});
        }
     
        const existeTarefa = await db("tarefa").select("*").where({id_tarefa}).andWhere({id_criador}).first();
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
        }
        catch{
            return res.status(500).json({mensagem:"Erro no servidor!"});
        }
    }
   
    async update(req,res){
        const id_usuariotarefa = req.params.id;
        const {id_tarefa, id_usuario} = req.body;
        const tipoUsuario = req.tipoUsuario;
        const idCriador = req.idUsuario;

        if(tipoUsuario === 3){
            return res.json({mensagem:"Não autorizado"});
        }

        const existeTarefa = await db("tarefa").select("*").where({
            id_tarefa,
            id_criador:idCriador
        }).first();
        if(!existeTarefa){
            return res.json({mesangem:"Tarefa inexistente"});
        }

        const verificaCriador = await db("usuario_tarefa").select("*")
        .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa").where("usuario_tarefa.id_usuariotarefa",id_usuariotarefa).first();

        if(verificaCriador.id_criador != idCriador){
            return res.json({mensagem:"Id do criador diferente"});
        }

     
        
        try{
            const editar_tarefa = await db("usuario_tarefa").where({id_usuariotarefa}).update({id_tarefa, id_usuario});
            if(editar_tarefa){
                return res.json({mensagem:"Relação editada com sucesso"});
            }
        }
        catch{
                return res.json({mensagem:"Erro no servidor!"});
        }
    }
    
    async delete(req,res){
        const id_usuariotarefa = req.params.id;
        const tipoUsuario = req.tipoUsuario;
        const id_criador = req.idUsuario;

        if(tipoUsuario === 3){
            return res.json({mensagem:"Não autorizado"});
        }
        
  
        
    }
}

    

export default new UsuarioTarefaController();