import config from '../../config/auth';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

class Authentication {
    async store(req, res, next) {
        const authHeader = req.headers.authorization;
        
        if(!authHeader) {
            return res.status(401).json({ error: 'Token não fornecido!' });
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = await promisify(jwt.verify)(token, config.secret);
        
            req.idUsuario = decoded.id_usuario;
            req.tipoUsuario = decoded.id_tipousuario;
            
            return next();
        
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido!' });
        }
    }

};

export default new Authentication();