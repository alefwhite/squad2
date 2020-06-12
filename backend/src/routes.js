import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import UsuarioController from './app/controllers/UsuarioController';
import SessionController from './app/controllers/SessionController';
import ConviteUsuarioController from './app/controllers/ConviteUsuarioController';
import UploadUsuarioController from './app/controllers/UploadUsuarioController';
import ProjetoController from './app/controllers/ProjetoController';
import SquadUsuarioController from './app/controllers/SquadUsuarioController';
import NotificacaoController from './app/controllers/NotificacaoController';
import TarefaController from './app/controllers/TarefaController';
import NotificacaoSquadTarefaController from './app/controllers/NotificacaoSquadTarefaController';
import SquadTarefaController from './app/controllers/SquadTarefaController';

import Authentication from './app/middlewares/Auth';
import AuthTipoDeUsuario  from './app/middlewares/AuthTipoDeUsuario';

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
routes.get('/squadusuario', Authentication.store, SquadUsuarioController.index);
routes.post('/squadusuario', Authentication.store, SquadUsuarioController.store);
routes.put('/squadusuario/:id', Authentication.store, SquadUsuarioController.update);
routes.delete('/squadusuario/:id', Authentication.store, SquadUsuarioController.delete);

// Notificacao
routes.get('/notificacao', Authentication.store, NotificacaoController.index);
routes.put('/notificacao/:id', Authentication.store, NotificacaoController.update);
// Rota para testar inclusão de notificacao
routes.post('/notificacao', Authentication.store, NotificacaoController.store);

//tarefa
routes.post('/tarefa', Authentication.store, TarefaController.store);
routes.put('/tarefa/:id', Authentication.store, TarefaController.update);
routes.get('/tarefa', Authentication.store, TarefaController.index);
routes.delete('/tarefa/:id', Authentication.store, TarefaController.delete);
// Notificacao Squad Tarefa
routes.get('/notificacaosquad', Authentication.store, NotificacaoSquadTarefaController.index);
routes.put('/notificacaosquad/:id', Authentication.store, NotificacaoSquadTarefaController.update);
// Rota para testar inclusão de notificacao para squad
routes.post('/notificacaosquad', Authentication.store, NotificacaoSquadTarefaController.store);

// Squad Tarefa
routes.get('/squadtarefa', Authentication.store, SquadTarefaController.index);
routes.post('/squadtarefa', Authentication.store, SquadTarefaController.store);
routes.put('/squadtarefa/:id', Authentication.store, SquadTarefaController.update);
routes.delete('/squadtarefa/:id', Authentication.store, SquadTarefaController.delete);

export default routes;