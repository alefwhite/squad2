import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/Teste/inicio.js'
import TesteImagem from './pages/Teste/inicio';
import Login from './pages/Login/login';
import Projeto from './pages/Projeto/projeto';

import Main from './pages/Main/main';
import GestorCadastro from './pages/Gestor/cadastro';
import FuncionarioCadastro from './pages/Funcionario/cadastrofunc';
// import Notificacao from './components/Notificacao/notificacao';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
                <Route path="/login" component={Login}/>
                <Route path="/projeto" component={Projeto}/>
                <Route exact path="/gestor" component={GestorCadastro} />
                <Route exact path="/convite" component={FuncionarioCadastro} />
                <Route path="/teste" component={TesteImagem} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}