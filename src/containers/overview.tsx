import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';

function Overview() {
  const { path } = useRouteMatch();
  const { started } = useTournamentContext();

  return (
    <>
      <h1>Tournament overview</h1>
      { started ?
        <>
          <Link to={path + Routes.DRAFT}>
            Get draft seatings
          </Link>
          <button>Start round</button>
        </>
      :
        <Link to={path + Routes.SETUP}>Set up tournament</Link>
      }
    </>
  );
}

export default Overview;
