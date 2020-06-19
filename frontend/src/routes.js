import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
import CadastroGestor from './pages/Gestor/cadastro'

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
                <Route path="/cadastrogestor" component={CadastroGestor}/>
            </Switch>
        </BrowserRouter>
        )
}