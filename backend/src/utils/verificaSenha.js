import bcrypt from 'bcryptjs';

export default (senha, senha_hash) => {
    return bcrypt.compare(senha, senha_hash);
};