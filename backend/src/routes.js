import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import ConviteUsuarioController from './app/controllers/ConviteUsuarioController';
import Authentication from './app/middlewares/Auth';
const routes = new Router();

// Session
routes.post('/session', SessionController.store);

// Usuario
routes.post('/usuario', UsuarioController.store);

// ConviteUsuario
routes.get('/convite', Authentication.store, ConviteUsuarioController.index);
routes.post('/convite', ConviteUsuarioController.store);



export default routes;