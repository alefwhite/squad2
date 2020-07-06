import db from '../../../database/connection';

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

        let { nome, descricao, prazo, hora_estimada, id_projeto } = req.body;              

        if(!(nome && descricao && prazo)) {
            return res.status(400).json({ mensagem: "Dados obrigatórios não informados!" });
        }

        // Tratando dados não obrigatórios no banco de dados
        id_projeto = id_projeto == "" || id_projeto == undefined || id_projeto == null ? null : id_projeto
        hora_estimada = hora_estimada == "" || hora_estimada == undefined || hora_estimada == null ? null : hora_estimada

        try {

           await db("tarefa").insert({
                nome,
                descricao,
                prazo,
                hora_estimada,
                id_criador,
                id_projeto
            })
            .then((nova_tarefa) => {

                if(nova_tarefa){
                    return res.json({ mensagem:"Tarefa cadastrada com sucesso!" });
                }

                return res.status(400).json({ mensagem: "Não foi possível cadastrar a tarefa!" });

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem:"Erro ao cadastrar tarefa!" });
            });

           
        } catch(error){
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }        
    }

    async update(req,res){     
        const id_tarefa = req.params.id;
        const id_criador = req.idUsuario;

        let { 
            nome, 
            descricao,
            prazo,
            hora_estimada,
            id_projeto,
            entregue 
        } = req.body;

        //tratando dados caso o campo venha vazio
        nome = nome == "" ? undefined : nome; 
        prazo = prazo == "" ? undefined : prazo;  
        hora_estimada = hora_estimada == "" ? undefined : hora_estimada;  
        id_projeto = id_projeto == "" ? undefined : id_projeto; 
        entregue = entregue == "" ? undefined : entregue; 
        
      
        try {

            await db("tarefa").update({
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
            .then((retorno) => {

                if(retorno) {
                    return res.json({ mensagem: "Tarefa editada com sucesso!" });
                }              

                return res.status(400).json({ mensagem: "Não foi possível editar a tarefa!" });

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao editar tarefa!" });
            });
            

            
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });        
        }
    }
    
    async index(req,res){
        const id_criador = req.idUsuario;
        const { entregue = 0, nome} = req.query;

        try {

           await db("tarefa")
                //.join("projeto","projeto.id_projeto","=","tarefa.id_projeto")
                .select(
                    "tarefa.id_tarefa",
                    "tarefa.nome",
                    "tarefa.descricao",
                    "tarefa.prazo",
                    "tarefa.hora_estimada",
                    "tarefa.entregue",
                    "tarefa.id_criador",
                    "tarefa.id_projeto",
                    //{"nome_projeto":"projeto.nome"}
                    //{"funcionario":"usuario.nome_social"}
                )
                .where("tarefa.entregue", entregue)
                //.join("usuario_tarefa","usuario_tarefa.id_tarefa","=","tarefa.id_tarefa")
               // .join("usuario","usuario.id_usuario","=","usuario_tarefa.id_usuario")
                //.andWhere("tarefa.nome","like",`%${nome}%`)
                .andWhere("tarefa.id_criador",id_criador)
                .orderBy("tarefa.id_tarefa", "desc")
                .then((tarefa) => {
                    console.log(tarefa);
                    return res.json(tarefa);
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao listar tarefa!" });
                });
                
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });        
        }
    }

    async delete(req,res){
       const id_tarefa = req.params.id;
       const id_criador = req.idUsuario;
      
       try {

            await db("tarefa").where({
                id_tarefa,
                id_criador
            })
            .delete()
            .then((retorno) => {
                
                if(retorno) {
                    return res.json({ mensagem: "Tarefa deletada com sucesso!" });
                }

                return res.status(400).json({ mensagem: "Não foi possível deletar tarefa" });

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao deletar tarefa!" }); 
            });      

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });  
        }
    }
}

export default new TarefaController();