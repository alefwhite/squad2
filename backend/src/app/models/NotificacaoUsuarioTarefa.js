import mongoose from 'mongoose';

const NotificacaoUsuarioTarefaSchema = new mongoose.Schema(
    {
        conteudo: {
            type: String,
            required: true,
        },
        user: {
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

export default mongoose.model('NotificacaoUsuarioTarefa', NotificacaoUsuarioTarefaSchema);