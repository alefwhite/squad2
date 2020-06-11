import db from '../../database/connection';
import verificaTipoUsuario from '../../utils/verificaTipoUsuario';

class ProjetoController {
    async store(req, res) {
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final } = req.body;

        if (verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try {
            const projeto = await db("projeto")
                .where({
                    nome,
                    id_criador: userId
                })
                .first();

            if (projeto) {
                return res.status(400).json({ error: "Você já tem um projeto cadastrado com esse nome!" });
            }

            const novo_projeto = await db("projeto").insert({
                nome: nome.toLowerCase(),
                descricao: descricao.toLowerCase(),
                data_inicial,
                data_final,
                id_criador: userId

            })
                .then(() => {
                    return res.json({ mensagem: "Projeto cadastrado com sucesso!" });
                })
                .catch(() => {
                    return res.status(400).json({ error: "Erro no cadastro do projeto!" });
                });

        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async index(req, res) {
        //TODO - Criar metodo para listar os projetos
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;

        if (verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try {
            const projeto = await db("projeto")
                .where({
                    id_criador: userId
                })

            return res.status(200).json({ projetos: projeto });

        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async update(req, res) {
        //TODO - Criar metodo para atualizar o projetos
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final } = req.body;
        const id_projeto = req.params.id;

        if (verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        try {
            const Projeto = await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                })
                .first();
            if (!Projeto) {
                return res.status(400).json({ error: "Você não pode alterar esse projeto" });
            }

            const atualizaProjeto = await db("projeto")
                .where({
                    id_projeto
                }).update({
                    nome: nome.toLowerCase(),
                    descricao: descricao.toLowerCase(),
                    data_inicial,
                    data_final
                })

                .then(() => {
                    return res.status(200).json({ mensagem: "Projeto atualizado com sucesso" });
                })
                .catch(() => {
                    return res.status(400).json({ error: "Erro na atualização do projeto!", });
                });


        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async delete(req, res) {
        //TODO - Criar metodo para remover um projeto
        const userId = req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const id_projeto = req.params.id;

        if (verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        } try {

            const Projeto = await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                })
                .first();
            if (!Projeto) {
                return res.status(400).json({ error: "Você não pode deletar esse projeto" });
            }


            const deletaProjeto = await db("projeto")
                .where({
                    id_criador: userId,
                    id_projeto
                }).del()
                .then(() => {
                    return res.status(200).json({ mensagem: "Projeto removido com sucesso" });
                })
                .catch(() => {
                    return res.status(400).json({ error: "Erro em remover o projeto!", });
                });


        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }


    }

}

export default new ProjetoController();