import db from '../../database/connection';

class ProjetoController {
    async store(req, res) {
        const userId =  req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final} = req.body;
        
        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        
        const projeto = await db("projeto")
            .where({ 
                nome,
                id_criador: userId
            })
            .first();


        if(projeto) {
            return res.status(400).json({ error: "Você já tem um projeto cadastrado com esse nome!"});
        }

        try {
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
                return res.status(400).json({ error: "Erro no cadastro do projeto!" });
            });
           
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }

    }
}

export default new ProjetoController();