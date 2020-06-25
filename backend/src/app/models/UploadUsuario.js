import mongoose from 'mongoose';

const UpoloadUsuarioSchema = new mongoose.Schema({
    img_usuario: {
        type: String,
        required: true,
    },
    user: {
        type: Number,
        required: true,
    },
    gestor: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});

UpoloadUsuarioSchema.virtual('img_url').get(function() {
    return `${process.env.APP_URL_UPIMG}${this.img_usuario}`
});

export default mongoose.model('UploadUsuario', UpoloadUsuarioSchema);
