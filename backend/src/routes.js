import { Router } from 'express';
import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Session
routes.post('/session', SessionController.store);

routes.get('/usuario', UsuarioController.index);
routes.post('/usuario', UsuarioController.store);


export default routes;