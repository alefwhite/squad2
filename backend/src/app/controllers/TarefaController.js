import db from '../../database/connection';
import UsuarioController from './UsuarioController';

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
        const id_criador = req.idUsuario;

        const {nome,descricao,prazo,hora_estimada,id_projeto = null,entregue} = req.body;
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
        const {entregue,nome} = req.query;
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


}

export default new TarefaController();