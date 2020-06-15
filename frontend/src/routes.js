import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Inicio from './pages/inicio'
import TesteImagem from './pages/testeImagem';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
            </Switch>
        </BrowserRouter>
        )
}