import db from '../../database/connection';


class TimesheetController {
    async index(req, res) {
        const id_usuario = req.idUsuario;

       

        return res.json({ mensagem: "teste" });
        
    }

   
}

export default new TimesheetController();