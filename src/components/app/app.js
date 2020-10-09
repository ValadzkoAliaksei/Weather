import React from 'react';
import { Route } from 'react-router-dom';

import { Main } from '../main'

import './app.css';

export const App = () => (
  <div className="App">
    <Route exact path='/'>
      <Main />
    </Route>
  </div>
);
