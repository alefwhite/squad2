import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login/login';
import Main from './pages/Main/main';
import GestorCadastro from './pages/Gestor/cadastro';
import FuncionarioCadastro from './pages/Funcionario/cadastrofunc';
import { usuarioAutenticado } from './service/auth';

const Permissao = ({ component: Component }) => (
    <Route 
        render={props => usuarioAutenticado() ? 
                (
                    <Component {...props} />
                )                
                :
                (
                    <Redirect to={{ pathname: "/" }} />
                )
        }
    />
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/gestor" component={GestorCadastro} />
                <Route exact path="/convite" component={FuncionarioCadastro} />
                <Permissao exact path="/dashboard" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}