import React from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Inicio from './pages/teste/inicio'
import TesteImagem from './pages/teste/testeImagem';
<<<<<<< HEAD
import CadastroGestor from './pages/Gestor/cadastro'
=======
import Login from './pages/login/login';
>>>>>>> feature/alberto/feature

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Inicio}/>
                <Route path="/teste" component={TesteImagem}/>
<<<<<<< HEAD
                <Route path="/cadastrogestor" component={CadastroGestor}/>
=======
                <Route path="/login" component={Login}/>
>>>>>>> feature/alberto/feature
            </Switch>
        </BrowserRouter>
        )
}