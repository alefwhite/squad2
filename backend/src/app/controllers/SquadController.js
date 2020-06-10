import db from '../../database/connection';

class SquadController {
    async index(req, res){
        const id_usuario = req.idUsuario;
        const tipo_usuario = req.tipoUsuario;

        // teste de verificação para saber se o usuario é do tipo funcionario
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }
        
        const listaSquad = await db("squad").where({
            id_criador: id_usuario
        });

        return res.json(listaSquad);

        }

    
    async store(req, res){
        const id_usuario =  req.idUsuario;
        const tipo_usuario = req.tipoUsuario;
        const nome = req.body.nome;

        // teste de verificação para saber se o usuario não é do tipo funcionario
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }
        //verifica se o squad a ser criado ja não existe no banco de dados
        const verificaNome = await db("squad").where({
            nome,
            id_criador: id_usuario       
        }).first();

        //caso exista retorna status 400
        if(verificaNome){
            return res.status(400).json({ mensagem:`A Squad ${nome}, ja está cadastrada `});
        }

        try {
            await db("squad").insert({
              nome,
              id_criador: id_usuario
            })
            .then(() => {
                return res.status(201).json({mensagem:`A Squad ${nome},foi cadastrada com sucesso`});
            })
            .catch(() => {
                return res.status(400).json({error:`erro ao cadastrar Squad`});
            })
        } catch (error) {
            return res.status(500).json({error: `erro interno no servidor`});
        }   
    }

    async update(req, res){
        const id_usuario =  req.idUsuario;
        const tipo_usuario = req.tipoUsuario;
        const nome = req.body.nome;
        const id_squad = req.params.id;
        
        // teste de verificação para saber se o usuario não é do tipo funcionario
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }

        try {
           const editaSquad = await db("squad").where({
              id_squad,
              id_criador: id_usuario
            })
            .update({nome})

            .then(() => {
                return res.status(200).json({mensagem:`A Squad ${nome},foi cadastrada com sucesso`});
            })
            .catch(() => {
                return res.status(400).json({error:`erro ao cadastrar Squad`});
            })
        } catch (error) {
            return res.status(500).json({error: `erro interno no servidor`});
        }   
    }

    async delete(req, res){
        const id_usuario =  req.idUsuario;
        const tipo_usuario = req.tipoUsuario;
        const id_squad = req.params.id;
        
        // teste de verificação para saber se o usuario não é do tipo funcionario
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }

        try {
            await db("squad").where({
              id_squad,
              id_criador: id_usuario
            })
            .delete()
            .then(() => {
                return res.status(200).json({mensagem:`A Squad foi excluida com sucesso`});
            })
            .catch(() => {
                return res.status(400).json({error:`erro ao excluir Squad`});
            })
        } catch (error) {
            return res.status(500).json({error: `erro interno no servidor`});
        }   
    }



}











export default new SquadController();