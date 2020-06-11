import verificaTipoUsuario from '../../utils/verificaTipoUsuario';

class AuthTipoDeUsuario {
    async store(req, res, next) {

        if(verificaTipoUsuario(req.tipoUsuario)) {
            return res.status(401).json({ mensagem: "Não autorizado!" });
        }

        return next();
    }
}

export default new AuthTipoDeUsuario();