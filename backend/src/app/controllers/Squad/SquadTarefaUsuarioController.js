import db from '../../../database/connection';

class SquadTarefaController {
    async index(req, res) {
        const id_usuario = req.idUsuario;
        const { page = 1 } = req.query             

        try {
           const [count] = await db("squad_tarefa as ST").count()
           .select([
               "ST.id_squadtarefa", 
               "S.nome as squad", 
               "S.id_squad",
               "P.nome as projeto", 
               "P.descricao as descricao_projeto", 
               "T.id_tarefa",
               "T.descricao as tarefa_descricao",
               "T.nome as tarefa_nome",
               "T.prazo", 
               "T.hora_estimada"
           ])
           .distinct("ST.id_squadtarefa")
           .innerJoin("squad as S", "S.id_squad", "=", "ST.id_squad")
           .innerJoin("squad_usuario as SU", "SU.id_squad", "=" ,"S.id_squad" )      
           .innerJoin("tarefa as T", "T.id_tarefa", "=", "ST.id_tarefa")
           .leftJoin("projeto as P", "P.id_projeto", "=", "T.id_projeto")
           .where({
               "SU.id_usuario" : id_usuario,                            
           })
           .orderBy("ST.id_squadtarefa", "desc");

           await db("squad_tarefa as ST")
                .select([
                    "ST.id_squadtarefa", 
                    "S.nome as squad", 
                    "S.id_squad",
                    "P.nome as projeto", 
                    "P.descricao as descricao_projeto", 
                    "T.id_tarefa",
                    "T.descricao as tarefa_descricao",
                    "T.nome as tarefa_nome",
                    "T.prazo", 
                    "T.hora_estimada"
                ])
                .distinct("ST.id_squadtarefa")
                .innerJoin("squad as S", "S.id_squad", "=", "ST.id_squad")
                .innerJoin("squad_usuario as SU", "SU.id_squad", "=" ,"S.id_squad" )      
                .innerJoin("tarefa as T", "T.id_tarefa", "=", "ST.id_tarefa")
                .leftJoin("projeto as P", "P.id_projeto", "=", "T.id_projeto")
                .where({
                    "SU.id_usuario" : id_usuario,                            
                })
                .orderBy("ST.id_squadtarefa", "desc")
                .limit(8)
                .offset((page - 1) * 8)
                .then((squad_tarefas) => {

                    if(squad_tarefas) {
                        console.log( count['count(*)'])
                        res.header('X-Total-Count', count['count(*)']);
                        return res.json(squad_tarefas);
                    }

                    return res.status(400).json({ mensagem: "Não foi possível listar squad/tarefa!" });
                })
                .catch((error) => {
                    console.error(error);

                    return res.status(400).json({ mensagem: "Erro ao listar squad tarefa." });
                });
    
            
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor." });
        }
    }

}

export default new SquadTarefaController();