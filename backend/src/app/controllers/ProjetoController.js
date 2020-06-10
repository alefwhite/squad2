import db from '../../database/connection';

class ProjetoController {
    async store(req, res) {
        const userId =  req.idUsuario;
        const tipoUsuario = req.tipoUsuario;
        const { nome, descricao, data_inicial, data_final} = req.body;
        
        if(tipoUsuario === 3) {
            return res.status(401).json({ error: "Não autorizado!"});
        }
        console.log(nome.toLowerCase());
        
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
            const novo_projeto = await db("projeto").insert({
                nome: nome.toLowerCase(),
                descricao: descricao.toLowerCase(),
                data_inicial,
                data_final,
                id_criador: userId

            });
            console.log(novo_projeto)
            if(novo_projeto) {
                return res.json({ mensagem: "Projeto cadastrado com sucesso!"});
            }
            
        } catch (error) {
            return res.status(400).json({ error: "Erro no cadastro do projeto!" });
        }


    }

    async index(req, res) {
        //TODO - Criar metodo para listar os projetos
    }


     async update(req, res) {
        //TODO - Criar metodo para atualizar o projetos
     }

     
     async delete(req, res) {
         //TODO - Criar metodo para remover um projeto

     }

}

export default new ProjetoController();