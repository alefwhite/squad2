import db from '../../database/connection';

class TarefaController{
    async store(req,res){
        const id_criador = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;

        const {nome,descricao,prazo,hora_estimada, id_projeto = null} = req.body;

        if(tipoUsuario===3){
            return res.status(401).json({error:"Não autorizado!"});
        }
        try{
            const nova_tarefa = await db("tarefa").insert({
                nome,
                descricao,
                prazo,
                hora_estimada,
                id_criador,
                id_projeto 
            });
            if(nova_tarefa){
                return res.json({mensagem:"Tarefa cadastrada com sucesso!"});
            }
            else{
                return res.json({mensagem:"Tarefa não cadastrada!"});
            }
        }
        catch(error){
            return res.status(500).json({error:`Erro no servidor ${error}`});
        }        
    }

    async update(req,res){
        const id_tarefa = req.params.id;
        const tipoUsuario = req.tipoUsuario;

        const {nome,descricao,prazo,hora_estimada,id_projeto = null} = req.body;
        if(tipoUsuario===3){
            return res.status(401).json({error:"Não autorizado"});
        }

        try{
            const editar_tarefa = await db("tarefa").where({
                id_tarefa
            }).update({
                nome,
                descricao,
                prazo,
                hora_estimada,
                id_projeto
            })
            if(editar_tarefa){
                return res.json({mensagem:"Tarefa editada com sucesso!"});
            }
            else{
                return res.json({mensagem:"Tarefa não existente!"});
            }
            }
        catch(error){
            return res.status(500).json({error:`Erro no servidor ${error}`});
        }
    }
    
    async index(req,res){
        const entregue = req.params.id;

        try{
            
        }
        catch(error){
            return res.status(500).json({error:"Erro no servidor"});
        }
    }

}

export default new TarefaController();