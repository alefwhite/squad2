import mongoose from 'mongoose';

const UpoloadUsuarioSchema = new mongoose.Schema({
    img_usuario: String,
    user: Number
}, {
    toJSON: {
        virtuals: true,
    }
});

UpoloadUsuarioSchema.virtual('img_url').get(function() {
    return `${process.env.APP_URL_UPIMG}${this.img_usuario}`
});

export default mongoose.model('UploadUsuario', UpoloadUsuarioSchema);
