import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/App';
import TesteImagem from './pages/TesteImagem'

import {BrowserRouter, Switch, Route} from 'react-router-dom';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={App}/>
    <Route path="/teste" component={TesteImagem}/>
  </Switch>
  </BrowserRouter>
  
  ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
