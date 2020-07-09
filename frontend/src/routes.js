import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login/login';
import Main from './pages/Main/main';
import GestorCadastro from './pages/Gestor/cadastro';
import FuncionarioCadastro from './pages/Funcionario/cadastrofunc';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/gestor" component={GestorCadastro} />
                <Route exact path="/" component={Login}/>
                <Route exact path="/dashboard" component={Main} />
                <Route exact path="/convite" component={FuncionarioCadastro} />
            </Switch>
        </BrowserRouter>
    )
}