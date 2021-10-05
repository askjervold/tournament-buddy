import React from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Routes from '../constants/routes';
import Draft from './draft';
import Setup from './setup';

function Tournament() {
  const { path } = useRouteMatch();

  return (
    <section className="tournament">
      <Switch>
        <Route exact path={path}>
          <Link to={path + Routes.DRAFT}>
            Get draft seatings
          </Link>
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
