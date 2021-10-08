import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import Button from '../components/button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';
import { Round } from '../types';
import { getRandomPairings } from '../utils/rounds';

function Overview() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { players, rounds, setRounds, started } = useTournamentContext();

  const startRound = () => {
    const roundNumber = (rounds[rounds.length - 1]?.number || 0) + 1;
    setRounds(prev => [...prev, { number: roundNumber, matches: getRandomPairings(players) }]);
    history.push(path + Routes.ROUND + `/${roundNumber}`);
  }

  const latestRound: Round | undefined = rounds[rounds.length - 1];
  const currentRound = latestRound && !latestRound.ended ? latestRound : null;

  return (
    <>
      <h1>Tournament overview</h1>
      { started ?
        <>
          { !latestRound &&
            <Link to={path + Routes.DRAFT}>
              Get draft seatings
            </Link>
          }
          { currentRound ?
            <>
              <p>Currently in round {currentRound.number}</p>
              <Link to={path + Routes.ROUND + `/${currentRound.number}`}>Show matches</Link>
            </> :
            <Button onClick={startRound}>Start next round</Button>
          }
        </>
      :
        <Link to={path + Routes.SETUP}>Set up tournament</Link>
      }
    </>
  );
}

export default Overview;
