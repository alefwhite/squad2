import db from '../../../database/connection';

class UsuarioNomeController{
    async index(req, res) {
        const id_usuario = req.idUsuario;

        const nome_social = await db("usuario as U").select("U.nome_social").where({ id_usuario }).first(); 
        console.log(nome_social)
        return res.json( nome_social );
    }
}

export default new UsuarioNomeController();