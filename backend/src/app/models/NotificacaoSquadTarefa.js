import mongoose from 'mongoose';

const NotificacaoSquadTarefaSchema = new mongoose.Schema(
    {
        conteudo: {
            type: String,
            required: true,
        },
        squad: {
            type: Number,
            required: true,
        },
        id_criador: {
            type: Number,
            required: true,
        },
        lido: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('NotificacaoSquadTarefa', NotificacaoSquadTarefaSchema);