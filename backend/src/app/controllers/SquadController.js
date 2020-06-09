import db from '../../database/connection';

class SquadController {
    async store(req, res){
        const id_usuario =  req.idUsuario;
        const tipo_usuario = req.tipoUsuario;
        const nome = req.body.nome;

        console.log(nome);
        if(tipo_usuario === 3){
            return res.status(401).json({ mensagem:"não autorizado"});
        }

        const verificaNome = await db("squad").where({
            nome,
            id_criador: id_usuario       
        }).first();
        console.log(verificaNome);

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