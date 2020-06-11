import db from '../../database/connection';

class TarefaController{
    /************************************************************************************************
    Classe responsável por criar,editar,listar e deletar tarefas.
    Método store é responsavel por cadastrar as tarefas e relacionar ao projeto.
    Método update é repsonsavel por editar a tarefa.
    Método index é responsavel por listar as tarefas de acordo com o nome da mesma e o id do criador
    Método delete é reponsavel por deletar a tarefa.
    Os parametros req(requisição) e res(resposta).
    **************************************************************************************************/ 
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
        const id_criador = req.idUsuario;

        let {nome,descricao,prazo,hora_estimada,id_projeto,entregue} = req.body;

        //tratando dados caso o campo venha vazio
        nome = nome == "" ? undefined:nome; 
        prazo = prazo == "" ? undefined:prazo;  
        hora_estimada = hora_estimada == "" ? undefined:hora_estimada;  
        id_projeto = id_projeto == "" ? undefined:id_projeto; 
        entregue = entregue == "" ? undefined:entregue; 
        
        if(tipoUsuario===3){
            return res.status(401).json({error:"Não autorizado"});
        }

      
        try{
            const editar_tarefa = await db("tarefa").update({
                nome,
                descricao,
                prazo,
                hora_estimada,
                entregue,
                id_projeto
            }).where({
                id_tarefa,
                id_criador
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
        const id_criador = req.idUsuario;
        const {entregue=0,nome} = req.query;
        console.log(`nome:${nome}, entregue:${entregue}`);
        try{
            const tarefa = await db("tarefa").join("projeto","projeto.id_projeto","=","tarefa.id_projeto").select(
                "tarefa.id_tarefa",
                "tarefa.nome",
                "tarefa.descricao",
                "tarefa.prazo",
                "tarefa.hora_estimada",
                "tarefa.entregue",
                "tarefa.id_criador",
                "tarefa.id_projeto",
                {"nome_projeto":"projeto.nome"}
                ).where("tarefa.entregue",entregue).andWhere("tarefa.nome","like",`%${nome}%`).andWhere("tarefa.id_criador",id_criador);
                
                return res.json(tarefa);
                
        }
        catch(error){
            return res.status(500).json({error:"Erro no servidor"});
        }
    }

    async delete(req,res){
       const id_tarefa = req.params.id;
       const id_criador = req.idUsuario;
       const tipoUsuario = req.tipoUsuario;

       if(tipoUsuario === 3){
           return res.json({mensagem:"Ação não permitida!"});
       }

       try{
        const deletar_tarefa = await db("tarefa").where({
            id_tarefa,
            id_criador
        }).delete();
        if(deletar_tarefa){
            res.json({mensagem:"Tarefa deletada com sucesso!"});
            console.log(deletar_tarefa);
        }
        else{
            res.json({mensagem:"Não foi possivel deletar a tarefa"});
            console.log(deletar_tarefa);
        }
       }
       catch(error){
           res.status(401).json({error:"Erro no servidor!"});
       }
    }
}

export default new TarefaController();