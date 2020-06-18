import db from '../../database/connection';

class SquadController {
    async index(req, res){
        const id_usuario = req.idUsuario;
        
        const listaSquad = await db("squad").where({
            id_criador: id_usuario
        });

        return res.json(listaSquad);

    }

    
    async store(req, res){
        const id_usuario =  req.idUsuario;
        let nome = req.body.nome;
        
        nome = nome == "" || nome == undefined || nome == null ? undefined : nome;

        if(!nome) {
            return res.status(400).json({ mensagem: "Nome da squad é obrigatório!" });
        }
        
        try {

            //verifica se o squad a ser criado ja não existe no banco de dados
            const verificaNome = await db("squad").where({
                nome,
                id_criador: id_usuario       
            }).first();

            //caso exista retorna status 400
            if(verificaNome){
                return res.status(400).json({ mensagem:`A Squad ${nome}, ja está cadastrada `});
            }

            await db("squad").insert({
              nome,
              id_criador: id_usuario
            })
            .then((retorno) => {

                if(retorno) {
                    return res.status(201).json({ mensagem:`A Squad ${nome}, foi cadastrada com sucesso`});
                }

                return res.status(400).json({ mensagem: "Não foi possível cadastrar squad!" });
            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem:`erro ao cadastrar Squad` });
            })
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: `erro interno no servidor` });
        }   
    }

    async update(req, res){
        const id_usuario =  req.idUsuario;
        let nome = req.body.nome;
        const id_squad = req.params.id;
        
        nome = nome == "" || nome == undefined || nome == null ? undefined : nome;

        if(!nome) {
            return res.status(400).json({ mensagem: "Nome da squad é obrigatório!" });
        }
        
        try {
            await db("squad").where({
              id_squad,
              id_criador: id_usuario
            })
            .update({nome})
            .then((retorno) => {

                if(retorno) {
                    return res.status(200).json({
                        mensagem:`A Squad ${nome},foi cadastrada com sucesso`
                    });                    
                }

                return res.status(400).json({ mensagem: "Não foi possível editar squad!" });
            })
            .catch((error) => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem:`erro ao editar Squad` });
            });

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: `erro interno no servidor` });
        }   
    }

    async delete(req, res){
        const id_usuario =  req.idUsuario;
        const id_squad = req.params.id;

        try {
            await db("squad").where({
              id_squad,
              id_criador: id_usuario
            })
            .delete()
            .then((retorno) => {

                if(retorno) {
                    return res.status(200).json({ mensagem:`A Squad foi excluida com sucesso` });              
                }

                return res.status(400).json({ mensagem: "Não foi possível deletar squad!" });
            })
            .catch((error) => {
                console.error("Error: ", error);
                
                return res.status(400).json({ mensagem:`erro ao excluir Squad` });
            })
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: `erro interno no servidor` });
        }   
    }
}

export default new SquadController();