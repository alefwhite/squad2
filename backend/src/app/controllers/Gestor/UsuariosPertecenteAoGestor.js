import db from '../../../database/connection';

class UsuariosPertecenteAoGestor{
   
    async index(req, res){
        const id_criador = req.idUsuario;

        const funcionarios = await db("usuario").where({
            id_criador,
            id_status: 1
        });


        return res.json(funcionarios);
    }

   
}

export default new UsuariosPertecenteAoGestor();