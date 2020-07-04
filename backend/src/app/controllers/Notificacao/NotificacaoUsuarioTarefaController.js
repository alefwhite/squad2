import db from '../../../database/connection';
import NotificacaoUsuarioTarefa from '../../models/NotificacaoUsuarioTarefa';
import formatarDataBr from '../../../utils/formatarDataBr';

class NotificacaoUsuarioTarefaController {
    async index(req, res) {
        const notificacoes_usuario = new Array();
        const id_usuario = 6; // req.idUsuario;

        try {
            
            const usuarioTarefa = await db("usuario_tarefa").where({ id_usuario });
            console.log(usuarioTarefa)
            if(!usuarioTarefa) {
                return res.status(400).json({ mensagem: "Usuário não tem nenhuma tarefa!" });
            }   
    
            for(let id of usuarioTarefa ) {
                const notificacoes = await NotificacaoUsuarioTarefa.find({
                    user: id.id_usuario,
                    lido: false
                })
                .sort({ createdAt: 'desc' })
                .limit(10);
    
                for(let notificacao of notificacoes) {
                    notificacoes_usuario.unshift(notificacao);
                }
                
            }
    
            const notificacoesUsuarioOrdenada = notificacoes_usuario.sort((a,b) => {
                return b.createdAt - a.createdAt;
            })    
    
            return res.json(notificacoesUsuarioOrdenada);
            
        } catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor!" });
        }
    }

    async store(req, res) {
        const { id_squad } = req.body

        const notificacao = await NotificacaoUsuarioTarefa.create({
            conteudo: `Você tem uma nova tarefa - ${formatarDataBr(new Intl.DateTimeFormat('pt-BR').format(new Date))}`,
            squad: id_squad,
            id_criador: req.idUsuario
        });

        return res.json(notificacao);

    }

    async update(req, res) {
        const notificacao = await NotificacaoUsuarioTarefa.findByIdAndUpdate(req.params.id, 
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

export default new NotificacaoUsuarioTarefaController();