import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Routes from '../constants/routes';
import Draft from './draft';
import Overview from './overview';
import Setup from './setup';

function Tournament() {
  const { path } = useRouteMatch();

  return (
    <section className="tournament">
      <Switch>
        <Route exact path={path}>
          <Overview />
        </Route>
        <Route path={path + Routes.SETUP}>
          <Setup />
        </Route>
        <Route path={path + Routes.DRAFT}>
          <Draft />
        </Route>
      </Switch>
    </section>
  );
}

export default Tournament;
