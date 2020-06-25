import db from '../../database/connection';

class ProjetoController {
    async store(req, res) {
        const userId =  req.idUsuario;
        const { nome, descricao, data_inicial, data_final} = req.body;

        if(!(nome && descricao && data_inicial && data_final)) {
            return res.status(400).json({ mensagem: "Dados obrigatórios não informados!" });
        }
        
        try {
            
            const projeto = await db("projeto")
                .where({ 
                    nome,
                    id_criador: userId
                })
                .first();


            if(projeto) {
                return res.status(400).json({ mensagem: "Você já tem um projeto cadastrado com esse nome!"});
            }

            await db("projeto").insert({
                nome,
                descricao,
                data_inicial,
                data_final,
                id_criador: userId

            })
            .then(() => {
                return res.json({ mensagem: "Projeto cadastrado com sucesso!"});
            })
            .catch(() => {
                console.error("Error: ", error);

                return res.status(400).json({ mensagem: "Erro no cadastro do projeto!" });
            });
           
            
        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }

    }

    async index(req, res) {
        const userId = req.idUsuario;       

        try {

           await db("projeto")
                .where({
                    id_criador: userId
                })
                .then((projetos) => {

                    if(projetos) {
                        return res.json(projetos);
                    }
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ mensagem: "Erro ao listar projetos!" });

                });           

        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }

    async update(req, res) {
        const userId = req.idUsuario;
        let { nome, descricao, data_inicial, data_final } = req.body;
        const id_projeto = req.params.id;
        
        nome = nome == "" || nome == undefined || nome == null ? undefined : nome
        descricao = descricao == "" || descricao == undefined || descricao == null ? undefined : descricao
        data_inicial = data_inicial == "" || data_inicial == undefined || data_inicial == null ? undefined : data_inicial
        data_final = data_final == "" || data_final == undefined || data_final == null ? undefined : data_final

        try {
            const projeto = await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                })
                .first();

            if (!projeto) {
                return res.status(400).json({ error: "Você não pode alterar esse projeto" });
            }

            await db("projeto")
                .where({
                    id_projeto
                }).update({
                    nome,
                    descricao,
                    data_inicial,
                    data_final
                })
                .then(() => {
                    return res.status(200).json({ mensagem: "Projeto atualizado com sucesso" });
                })
                .catch((error) => {
                    console.error("Error: ", error);

                    return res.status(400).json({ error: "Erro na atualização do projeto!", });
                });


        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }

    async delete(req, res) {
        const userId = req.idUsuario;
        const id_projeto = req.params.id;
       
        try {

            const projeto = await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                })
                .first();

            if (!projeto) {
                return res.status(400).json({ mensagem: "Você não pode deletar esse projeto" });
            }


           await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                })
                .delete()
                .then(() => {
                    return res.status(200).json({ mensagem: "Projeto removido com sucesso" });
                })
                .catch((error) => {
                    console.error("Error: ", error);
                    
                    return res.status(400).json({ mensagem: "Erro ao remover o projeto!", });
                });


        } catch(error) {
            console.error("Error: ", error);

            return res.status(500).json({ mensagem: "Erro interno no servidor!" });
        }
    }

}

export default new ProjetoController();
