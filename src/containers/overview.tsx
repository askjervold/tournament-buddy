import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Button from '../components/button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';

function Overview() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { rounds, setRounds, started } = useTournamentContext();

  const startRound = () => {
    const roundNumber = (rounds[rounds.length - 1]?.number || 0) + 1;
    setRounds(prev => [...prev, { number: roundNumber, matches: [] }]);
    history.push(path + Routes.ROUND + `/${roundNumber}`);
  }

  return (
    <>
      <h1>Tournament overview</h1>
      { started ?
        <>
          <Link to={path + Routes.DRAFT}>
            Get draft seatings
          </Link>
          <Button onClick={startRound}>Start round</Button>
        </>
      :
        <Link to={path + Routes.SETUP}>Set up tournament</Link>
      }
    </>
  );
}

export default Overview;
