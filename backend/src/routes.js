import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';

import GestorController from './app/controllers/GestorController';
import SessionController from './app/controllers/SessionController';
import FuncionarioController from './app/controllers/FuncionarioController';
import ConviteUsuarioController from './app/controllers/ConviteUsuarioController';
import UploadUsuarioController from './app/controllers/UploadUsuarioController';
import ProjetoController from './app/controllers/ProjetoController';
import SquadUsuarioController from './app/controllers/SquadUsuarioController';
import NotificacaoController from './app/controllers/NotificacaoController';
import TarefaController from './app/controllers/TarefaController';
import UsuarioTarefaController from './app/controllers/UsuarioTarefaController';
import NotificacaoSquadTarefaController from './app/controllers/NotificacaoSquadTarefaController';
import SquadTarefaController from './app/controllers/SquadTarefaController';
import SquadController from './app/controllers/SquadController';
import TimesheetController from './app/controllers/TimesheetController';

import Authentication from './app/middlewares/Auth';
import AuthTipoDeUsuario  from './app/middlewares/AuthTipoDeUsuario';


const routes = new Router();
const upload = multer(uploadConfig);

// Rota Session
routes.post('/session', SessionController.store);


// Rota Gestor - Cria um usuário do tipo gestor
routes.post('/gestor', GestorController.store);


// Rota Funcionario - Apenas usuários que recebem o link de cadastro gerado pelo gestor
routes.post('/funcionario', FuncionarioController.store);


/*      
                        Autenticação - JWT
   Todas as rotas que forem criadas depois do routes.use(Authentication.store).
   Terá a autenticação, obrigando o usuário a estar logado.
*/
routes.use(Authentication.store);


// Rota Notificacao
routes.get('/notificacao', NotificacaoController.index);
routes.put('/notificacao/:id', NotificacaoController.update);
// Rota para testar inclusão de notificacao
routes.post('/notificacao', NotificacaoController.store);


// Rota Funcionario
routes.get('/funcionario', FuncionarioController.index);
routes.put('/funcionario', FuncionarioController.update);


// Rota timesheet
routes.get('/timesheet', TimesheetController.index);


// Rota de Upload da Imagem dos usuários
routes.get('/uploadusuario', UploadUsuarioController.show);
routes.post('/uploadusuario', upload.single("img_usuario"), UploadUsuarioController.store);


/*      
                        Autenticação - Tipo de usuário
   Todas as rotas que forem criadas depois do routes.use(AuthTipoDeUsuario.store),
   Só poderão ser acessadas por usuários que não sejam do tipo id_tipousuario = 3
*/
routes.use(AuthTipoDeUsuario.store);


// Gestor
routes.get('/gestor', GestorController.index);
routes.put('/gestor', GestorController.update);


// Rota Convite - Gera o link de cadastro para funcionarios
routes.get('/convite', ConviteUsuarioController.show);


// Rota Projeto
routes.post('/projeto', ProjetoController.store);
routes.get('/projeto', ProjetoController.index);
routes.put('/projeto/:id', ProjetoController.update);
routes.delete('/projeto/:id', ProjetoController.delete);


// Rota Squad Usuario
routes.get('/squadusuario', SquadUsuarioController.index);
routes.post('/squadusuario', SquadUsuarioController.store);
routes.put('/squadusuario/:id', SquadUsuarioController.update);
routes.delete('/squadusuario/:id', SquadUsuarioController.delete);


// Rota tarefa
routes.post('/tarefa', TarefaController.store);
routes.put('/tarefa/:id', TarefaController.update);
routes.get('/tarefa', TarefaController.index);
routes.delete('/tarefa/:id', TarefaController.delete);


// Rota para atribuir tarefas ao usuario
routes.post('/usuariotarefa', UsuarioTarefaController.store);
routes.put('/usuariotarefa/:id', UsuarioTarefaController.update);
routes.delete('/usuariotarefa/:id', UsuarioTarefaController.delete);
routes.get('/usuariotarefa', UsuarioTarefaController.index);


// Rota Notificacao Squad Tarefa
routes.get('/notificacaosquad', NotificacaoSquadTarefaController.index);
routes.put('/notificacaosquad/:id', NotificacaoSquadTarefaController.update);
// Rota para testar inclusão de notificacao para squad
routes.post('/notificacaosquad', NotificacaoSquadTarefaController.store);


// Rota Squad Tarefa
routes.get('/squadtarefa', SquadTarefaController.index);
routes.post('/squadtarefa', SquadTarefaController.store);
routes.put('/squadtarefa/:id', SquadTarefaController.update);
routes.delete('/squadtarefa/:id', SquadTarefaController.delete);


// Rota Squad
routes.get('/squad', SquadController.index);
routes.post('/squad', SquadController.store);
routes.put('/squad/:id', SquadController.update);
routes.delete('/squad/:id', SquadController.delete);


export default routes;