import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import ConviteUsuarioController from './app/controllers/ConviteUsuarioController';
import UploadUsuarioController from './app/controllers/UploadUsuarioController';
import ProjetoController from './app/controllers/ProjetoController';
import SquadUsuarioController from './app/controllers/SquadUsuarioController';

import Authentication from './app/middlewares/Auth';

const routes = new Router();
const upload = multer(uploadConfig);

// Session
routes.post('/session', SessionController.store);

// Usuario
routes.post('/usuario', UsuarioController.store);

// ConviteUsuario
routes.get('/convite', Authentication.store, ConviteUsuarioController.show);
routes.post('/convite', ConviteUsuarioController.store);

// Upload da Imagem do usuário
routes.get('/uploadusuario', Authentication.store, UploadUsuarioController.show);
routes.post('/uploadusuario',  
        upload.single("img_usuario"), 
        Authentication.store, 
        UploadUsuarioController.store
);

// Projeto
routes.post('/projeto', Authentication.store, ProjetoController.store);

// Squad Usuario
routes.post('/squadusuario', Authentication.store, SquadUsuarioController.store);
routes.put('/squadusuario/:id_squad/:id_usuario', Authentication.store, SquadUsuarioController.update);
routes.delete('/squadusuario/:id_squadUsuario', Authentication.store, SquadUsuarioController.delete);

export default routes;