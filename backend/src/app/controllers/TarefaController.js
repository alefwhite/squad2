import db from '../../database/connection';

class TarefaController{
    async store(req,res){
        const {nome,descricao,prazo,hora_estimada, id_projeto = null} = req.body;
        const id_criador = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;

        if(tipoUsuario===3){
            return res.status(401).json({error:"Não autorizado!"});
        }

        try{
            const nova_tarefa = await db("tarefa").insert({
                nome:nome.toLowerCase(),
                descricao:descricao.toLowerCase(),
                prazo,
                hora_estimada,
                id_criador       
            });
            return res.json({menssagem:"Tarefa cadastrada com sucesso!"});
        }
        catch(error){
            return res.status(500).json({error:`Erro no servidor ${error}`});
        }
    }
}

export default new TarefaController();