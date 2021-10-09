import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useTournamentContext } from '../contexts/tournament-context';
import Routes from '../constants/routes';
import Button from '../components/button';
import Match from '../components/match';

type RoundParams = {
  roundNumber: string;
}

function Round() {
  const history = useHistory();
  const { roundNumber: roundNumberParam } = useParams<RoundParams>();
  const { rounds, setRounds } = useTournamentContext();
  const roundNumber = parseInt(roundNumberParam, 10);
  const round = rounds.find(r => r.number === roundNumber);

  const endRound = () => {
    setRounds(prev =>
      prev.map(
        round => round.number === roundNumber ?
          { ...round, ended: true } : round
      )
    );
    history.push(Routes.TOURNAMENT);
  }

  return (
    round ?
    <>
      <h1>Round {roundNumberParam}</h1>
      <section className="matches">
        { round.matches.map(match => <Match key={match.table} match={match} />) }
      </section>
      <Button onClick={endRound}>End round</Button>
    </> :
    <>
      <p>This round has not yet started!</p>
      <Link to={Routes.TOURNAMENT}>Back to overview</Link>
    </>
  );
}

export default Round;
