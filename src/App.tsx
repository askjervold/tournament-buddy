import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from './components/app-header';
import Routes from './constants/routes';
import Home from './containers/home';
import Tournament from './containers/tournament';
import TournamentContext from './contexts/tournament-context';

function App() {
  return (
    <Router>
      <AppHeader />
      <main>
      <Switch>
        <Route path={Routes.TOURNAMENT}>
          <TournamentContext>
            <Tournament />
          </TournamentContext>
        </Route>
        <Route path={Routes.HOME}>
          <Home />
        </Route>
      </Switch>
      </main>
    </Router>
  );
}

export default App;
