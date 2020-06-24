import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
import Login from './pages/login/login';
import Sidebar from './components/sidebar/sidebar';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
                <Route path="/login" component={Login}/>
                <Route path="/sidebar" component={Sidebar}/>
            </Switch>
        </BrowserRouter>
        )
}