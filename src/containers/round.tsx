import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import { useTournamentContext } from '../contexts/tournament-context';
import Routes from '../constants/routes';
import Button from '../components/button';
import { getRandomPairings } from '../utils/rounds';

type RoundParams = {
  roundNumber: string;
}

function Round() {
  const history = useHistory();
  const { roundNumber: roundNumberParam } = useParams<RoundParams>();
  const { players, rounds, setRounds } = useTournamentContext();
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

  if (round && !round.matches.length) {
    setRounds(prev => prev.map(r => {
      if (r.number !== roundNumber) return r;
      return { ...r, matches: getRandomPairings(players) };
    }));
  }

  return (
    round ?
    <>
      <h1>Round {roundNumberParam}</h1>
      <section className="matches">
        {round.matches.map(match =>
          <article key={match.table}>
            {match.player1.name} vs. {match.player2?.name || '** BYE **'}
          </article>
        )}
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
