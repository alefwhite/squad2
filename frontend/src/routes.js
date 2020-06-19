
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';


export default function Routes() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" component={Dashboard}/>
    </Switch>
    </BrowserRouter>
  )}

  