import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
import Login from './pages/login/login';
import Main from './pages/main/main';
import GestorCadastro from './pages/Gestor/cadastro';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio} />
                <Route exact path="/cad" component={GestorCadastro} />
                <Route path="/teste" component={TesteImagem} />
                <Route path="/login" component={Login} />
                <Route path="/dashboard" component={Main} />
                <Route path="/cadastrosquad" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}