import db from '../../database/connection';

class UsuarioTarefaController {
/*****************************************************************************************
 Classe responsavel por relacionar tarefas aos usuarios.
 Método store é responsavel por relacionar tarefa ao usuario.
 Método update é responsavel por alterar a relação do usuario a terefa.
 Método delete é responsavel por apagar a relação entre o usuario e a tarefa.
 Método index é responsavel por retornar as tarefas relacionadas ao usuario.
 Os parametros req(requisiçao) e res(resposta).
******************************************************************************************/

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
        let {id_tarefa, id_usuario} = req.body;
        const tipoUsuario = req.tipoUsuario;
        const idCriador = req.idUsuario;
        
        //tratando caso o campo venha vazio
        id_tarefa = id_tarefa == "" ? undefined:id_tarefa;
        id_usuario = id_usuario == "" ? undefined:id_usuario;

        if(tipoUsuario === 3){
            return res.json({mensagem:"Não autorizado"});
        }

        try{
            
            if(id_tarefa != undefined){ 
                const existeTarefa = await db("tarefa").select("*").where({
                id_tarefa,
                id_criador:idCriador
                }).first();
    
            if(!existeTarefa){
                return res.json({mesangem:"Tarefa inexistente"});
            }
        }
            
            const verificaCriador = await db("usuario_tarefa").select("*")
            .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa").where("usuario_tarefa.id_usuariotarefa",id_usuariotarefa).first();
    
            if(verificaCriador.id_criador != idCriador){
                return res.json({mensagem:"Id do criador diferente"});
            }


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
        
        try{
            const verificaCriador = await db("usuario_tarefa").select("*")
            .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa").where("usuario_tarefa.id_usuariotarefa",id_usuariotarefa).first();
            
            if(verificaCriador.id_criador != id_criador){
                return res.json({mensagem:"Tarefa inexistente"});
            }
            
            const verificaUsuarioTarefa = await db("usuario_tarefa").select("*").where({id_usuariotarefa}).first();
            if(!verificaUsuarioTarefa){
                return res.json({mensagem:"Tarefa inexistente"});
            }

            const deletarTarefa = await db("usuario_tarefa").where({id_usuariotarefa}).delete();

            if(deletarTarefa){
                return res.json({mensagem:"Tarefa deletada com sucesso"});
            }
        }
        catch{
            return res.status(500).json({mensagem:"Erro no servidor"});
        }
    }

    async index(req,res){
        const idUsuario = req.idUsuario;
        const {nome,entregue=0} = req.body;

        try{
            const usuarioTarefa = await db("usuario_tarefa").select(
                "tarefa.nome",
                "tarefa.descricao",
                "tarefa.prazo",
                "tarefa.hora_estimada",
                {"nome_projeto":"projeto.nome"},
                "tarefa.entregue"
                )
            .join("tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa")
            .join("projeto","tarefa.id_criador","=","projeto.id_criador").where("usuario_tarefa.id_usuario",idUsuario).
            andWhere("tarefa.entregue",entregue).andWhere("tarefa.nome","like",`%${nome}%`);
            return res.json(usuarioTarefa);
        }
        catch{
            return res.status(400).json({mensagem:"Erro no servidor"});
        }
    }
}

    

export default new UsuarioTarefaController();