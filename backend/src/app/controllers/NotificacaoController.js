import Notificacao from '../models/Notificacao';

class NotificacaoController {
    async index(req, res) {
        const notificacoes = await Notificacao.find({
            user: req.idUsuario,
            lido: false
        })
        .sort({ createdAt: 'desc' })
        .limit(20);

        return res.json(notificacoes);
    }

    async store(req, res) {
        const { id_usuario } = req.body

        const notificacao = await Notificacao.create({
            conteudo: `Você tem uma nova tarefa ${new Date()}`,
            user: id_usuario,
        });

        return res.json(notificacao);

    }

    async update(req, res) {
        const notificacao = await Notificacao.findByIdAndUpdate(req.params.id, 
            { lido: true},
            { new: true}
        );

        return res.json(notificacao);
    }
}

export default new NotificacaoController();