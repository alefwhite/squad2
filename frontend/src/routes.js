import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
import Login from './pages/login/login';
import Projeto from './pages/projeto/projeto';

import Main from './pages/main/main';
import GestorCadastro from './pages/Gestor/cadastro';
import FuncionarioCadastro from './pages/Funcionario/cadastrofunc';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
                <Route path="/login" component={Login}/>
                <Route path="/projeto" component={Projeto}/>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/gestor" component={GestorCadastro} />
                <Route exact path="/convite" component={FuncionarioCadastro} />
                <Route path="/teste" component={TesteImagem} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}