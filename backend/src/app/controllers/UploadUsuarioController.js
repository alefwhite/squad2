import UploadUsuario from '../models/UploadUsuario';

class UploadUsuarioController {
    async show(req, res) {
        const userId = req.idUsuario;
        try {
            if(!userId) {
                return res.status(401).json({ error: "Não autorizado!"});
            }
    
            const existeImg = await UploadUsuario.findOne({ user: userId });
    
            if(!existeImg) {
                return res.status(400).json({ error: "O usuário não tem imagem cadastrada!"});
            }
    
            return res.json({ imgurl: existeImg.img_url });        
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});
        }
    }

    async store(req, res) {
        const { filename } = req.file;
        const userId = req.idUsuario;

        try {
            if(!userId) {
                return res.status(401).json({ error: "Não autorizado!"});
            }
    
            const existeImg = await UploadUsuario.findOne({ user: userId });
    
            if(!existeImg) {
                await UploadUsuario.create({ img_usuario: filename, user: userId });
            }
            
            const query = { user: userId };
    
            const ret = await UploadUsuario.findOneAndUpdate(query, { img_usuario: filename }, {new: true});
            
            return res.json({ret});
            
        } catch (error) {
            return res.status(500).json({error: "Erro interno no servidor."});
        }
    }
}

export default new UploadUsuarioController();