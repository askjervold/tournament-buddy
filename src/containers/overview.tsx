import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Button from '../components/button';
import LinkButton from '../components/link-button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';
import { endTournament } from '../service';
import { Round } from '../types';
import {
  getMatchesFromPairings,
  getRandomPairings,
  getSwissPairings,
} from '../utils/rounds';

function Overview() {
  const history = useHistory();
  const { path } = useRouteMatch();
  const { players, rounds, setRounds, started } = useTournamentContext();

  const startRound = () => {
    const roundNumber = (rounds[rounds.length - 1]?.number || 0) + 1;
    const pairings =
      rounds.length === 0
        ? getRandomPairings(players)
        : getSwissPairings(players, rounds, false);

    setRounds((prev) => [
      ...prev,
      { number: roundNumber, matches: getMatchesFromPairings(pairings) },
    ]);
    history.push(path + Routes.ROUND + `/${roundNumber}`);
  };

  const completeTournament = () => {
    history.push(path + Routes.STANDINGS);
    endTournament();
  };

  const latestRound: Round | undefined = rounds[rounds.length - 1];
  const currentRound = latestRound && !latestRound.ended ? latestRound : null;
  const hasFinishedRounds = rounds.filter((round) => round.ended).length > 0;

  return (
    <>
      <h1>Tournament overview</h1>
      {started ? (
        <>
          {!latestRound && (
            <LinkButton to={path + Routes.DRAFT}>Get draft seatings</LinkButton>
          )}
          {hasFinishedRounds && (
            <LinkButton to={path + Routes.STANDINGS}>View standings</LinkButton>
          )}
          {currentRound ? (
            <>
              <p>Currently in round {currentRound.number}</p>
              <LinkButton to={path + Routes.ROUND + `/${currentRound.number}`}>
                Show matches
              </LinkButton>
            </>
          ) : (
            <Button onClick={startRound}>Start next round</Button>
          )}
          <Button onClick={completeTournament}>End tournament</Button>
        </>
      ) : (
        <LinkButton to={path + Routes.SETUP}>Set up tournament</LinkButton>
      )}
    </>
  );
}

export default Overview;
