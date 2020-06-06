import multer from 'multer';
import { resolve, extname, basename } from 'path';
import removeCaracteresEspacos from '../utils/removeCaracteresEspaços';

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
        
        filename: (req, file, cb) => {
            const ext = extname(file.originalname);

            let nome = basename(file.originalname, ext);

            nome = removeCaracteresEspacos(nome);
            
            cb(null, `${nome.toString()}-${Date.now()}${ext}`);
        },
    }),
}