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
import UsuarioTarefaController from './app/controllers/UsuarioTarefaController';

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
routes.get('/squadusuario', Authentication.store, SquadUsuarioController.index);
routes.post('/squadusuario', Authentication.store, SquadUsuarioController.store);
routes.put('/squadusuario/:id', Authentication.store, SquadUsuarioController.update);
routes.delete('/squadusuario/:id', Authentication.store, SquadUsuarioController.delete);

// Notificacao
routes.get('/notificacao', Authentication.store, NotificacaoController.index);
routes.put('/notificacao/:id', Authentication.store, NotificacaoController.update);
// Rota para testar inclusão de notificacao
routes.post('/notificacao', Authentication.store, NotificacaoController.store);

// Rota tarefa
routes.post('/tarefa', Authentication.store, TarefaController.store);
routes.put('/tarefa/:id', Authentication.store, TarefaController.update);
routes.get('/tarefa', Authentication.store, TarefaController.index);
routes.delete('/tarefa/:id', Authentication.store, TarefaController.delete);

// Rota para atribuir tarefas ao usuario
routes.post('/usuariotarefa', Authentication.store, UsuarioTarefaController.store);
routes.put('/usuariotarefa/:id', Authentication.store, UsuarioTarefaController.update);
routes.delete('/usuariotarefa/:id', Authentication.store, UsuarioTarefaController.delete);
export default routes;