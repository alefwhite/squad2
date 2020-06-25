import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
import Login from './pages/login/login';
import Projeto from './pages/projeto/projeto';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
                <Route path="/login" component={Login}/>
                <Route path="/projeto" component={Projeto}/>
            </Switch>
        </BrowserRouter>
        )
}