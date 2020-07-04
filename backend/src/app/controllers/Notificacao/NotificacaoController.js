import Notificacao from '../../models/Notificacao';
import formatarDataBr from '../../../utils/formatarDataBr';

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
            conteudo: `Você tem uma nova tarefa para - ${formatarDataBr(new Intl.DateTimeFormat('pt-BR').format(new Date))}`,
            user: id_usuario,
            id_criador: req.idUsuario
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

    async delete(req, res) {
        const notificacao = await Notificacao.findByIdAndRemove({ _id : req.params.id });

        if(notificacao) {
            return res.json({ mensagem: "Notificação deletada com sucesso!" });
        }

        return res.status(400).json({ mensagem: "Não foi possívle deletar notificação!"});
    }
}

export default new NotificacaoController();