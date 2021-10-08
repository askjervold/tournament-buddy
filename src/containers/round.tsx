import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import shuffle from 'lodash/shuffle';

import { useTournamentContext } from '../contexts/tournament-context';
import Routes from '../constants/routes';
import Button from '../components/button';
import { Match } from '../types';

type RoundParams = {
  roundNumber: string;
}

function Round() {
  const history = useHistory();
  const { roundNumber: roundNumberParam } = useParams<RoundParams>();
  const { players, setRounds } = useTournamentContext();
  const roundNumber = parseInt(roundNumberParam, 10);

  const getPairings = () => {
    const shuffledPlayers = shuffle(players);
    const matches: Match[] = [];
    let table = 1;
    while (shuffledPlayers.length > 0) {
      matches.push({
        table: table.toString(),
        player1: shuffledPlayers.shift()!,
        player2: shuffledPlayers.shift() || null
      });
      table++;
    }
    return matches;
  }

  const endRound = () => {
    console.log('Trying to end round', roundNumber);
    setRounds(prev =>
      prev.map(
        round => round.number === roundNumber ?
          { ...round, ended: true } : round
      )
    );
    history.push(Routes.TOURNAMENT);
  }

  return (
    <>
      <h1>Round {roundNumberParam}</h1>
      <section className="matches">
        {getPairings().map(match =>
          <article key={match.table}>
            {match.player1.name} vs. {match.player2?.name || '** BYE **'}
          </article>
        )}
      </section>
      <Button onClick={endRound}>End round</Button>
    </>
  );
}

export default Round;
