import db from '../../database/connection';

class SquadController {
    async index(req, res){
        const id_usuario = req.idUsuario;
        const nome = req.body.nome;

        // teste de verificação para saber se o usuario não é do tipo funcionario
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }
        
        const listaSquad = await db("squad").select({
            nome,
            id_criador: id_usuario
        });

return res.status(200).json({mensagem: "listagem feita com sucesso"});



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





}

export default new SquadController();