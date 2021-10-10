import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Routes from '../constants/routes';
import Draft from './draft';
import Overview from './overview';
import Round from './round';
import Setup from './setup';
import Standings from './standings';

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
        <Route path={path + Routes.ROUND + '/:roundNumber'}>
          <Round />
        </Route>
        <Route path={path + Routes.STANDINGS}>
          <Standings />
        </Route>
      </Switch>
    </section>
  );
}

export default Tournament;
