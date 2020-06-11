import db from '../../database/connection';

class ProjetoController {
    async store(req, res) {
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final } = req.body;

        if (tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!" });
        }
        const projeto = await db("projeto")
            .where({
                nome,
                id_criador: userId
            })
            .first();

        if (projeto) {
            return res.status(400).json({ error: "Você já tem um projeto cadastrado com esse nome!" });
        }

        try {
            const novo_projeto = await db("projeto").insert({
                nome: nome.toLowerCase(),
                descricao: descricao.toLowerCase(),
                data_inicial,
                data_final,
                id_criador: userId

            });
            if (novo_projeto) {
                return res.json({ mensagem: "Projeto cadastrado com sucesso!" });
            }

        } catch (error) {
            return res.status(400).json({ error: "Erro no cadastro do projeto!", error });
        }


    }

    async index(req, res) {
        //TODO - Criar metodo para listar os projetos
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        console.log(userId);
        if (tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!" });
        }

        const projeto = await db("projeto")
            .where({
                id_criador: userId
            })

        return res.status(200).json({ projetos: projeto });

    }


    async update(req, res) {
        //TODO - Criar metodo para atualizar o projetos
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final, id_projeto } = req.body;

        if (tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!" });

        }

        try {
            const atualizaProjeto = await db("projeto")
                .where({
                    id_projeto,
                }).update({
                    nome: nome.toLowerCase(),
                    descricao: descricao.toLowerCase(),
                    data_inicial,
                    data_final,
                });
            if (atualizaProjeto) {
                return res.status(200).json({ mensagem: "Projeto atualizado com sucesso" });
            }
        } catch (error) {
            return res.status(400).json({ error: "Erro na atualização do projeto!", });
        }
    }

    async delete(req, res) {
        //TODO - Criar metodo para remover um projeto

        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { id_projeto } = req.body;

        if (tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!" });
        } try {
            const deletaProjeto = await db("projeto")
                .where({
                    id_projeto,
                }).del();
            if (deletaProjeto) {
                return res.status(200).json({ mensagem: "Projeto removido com sucesso" });
            }
        } catch (error) {
            return res.status(400).json({ error: "Erro em remover o projeto!", });
        }


    }

}

export default new ProjetoController();