import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import Routes from './constants/routes';
import Home from './containers/home';
import Tournament from './containers/tournament';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Routes.HOME}>
          <Home />
        </Route>
        <Route path={Routes.TOURNAMENT}>
          <Tournament />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
