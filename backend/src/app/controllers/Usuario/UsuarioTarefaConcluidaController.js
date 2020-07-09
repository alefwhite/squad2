import db from '../../../database/connection';

class UsuarioTarefaConcluidaController{
   
    async update(req, res){
        const id_tarefa = req.params.id;
        const entregue = req.body;
        
        entregue == "" ? undefined : entregue; 

        try {

            await db("tarefa").update({
                entregue   
            }).where({
                id_tarefa
            })
            .then((retorno) => {

                if(retorno) {
                    return res.json({ mensagem: "Tarefa concluida com sucesso!" });
                }              

                return res.status(400).json({ mensagem: "Não foi possivel concluir a tarefa!" });

            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro ao concluir tarefa!" });
            });
                  
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });        
        }
        return res.json({});
    }

   
}

export default new UsuarioTarefaConcluidaController();