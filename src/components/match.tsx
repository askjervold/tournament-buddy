import React, { useState } from 'react';
import { useTournamentContext } from '../contexts/tournament-context';
import { Match as MatchType, MatchResult } from '../types';
import Button from './button';

type MatchProps = {
  match: MatchType;
};

function Match({ match }: MatchProps) {
  const [player1Wins, setP1Wins] = useState<string>(
    match.result.player1Wins?.toString() || ''
  );
  const [player2Wins, setP2Wins] = useState<string>(
    match.result.player2Wins?.toString() || ''
  );
  const [draws, setDraws] = useState<string>(
    match.result.draws?.toString() || ''
  );
  const { rounds, setRounds } = useTournamentContext();

  const submitResult = () => {
    const result: MatchResult = {
      player1Wins: parseInt(player1Wins, 10) || 0,
      player2Wins: parseInt(player2Wins, 10) || 0,
      draws: parseInt(draws, 10) || 0,
    };
    const currentRound = rounds.find((round) => !round.ended);
    setRounds((prev) =>
      prev.map((r) => {
        if (r.number !== currentRound?.number) return r;
        return {
          ...r,
          matches: r.matches.map((m) => {
            return m.table === match.table
              ? { ...m, result, submitted: true }
              : m;
          }),
        };
      })
    );
  };

  return (
    <article>
      {match.player1.name} vs. {match.player2?.name || '** BYE **'}
      {match.submitted ? (
        <p className="result">
          {match.result.player1Wins}-{match.result.player2Wins}-
          {match.result.draws}
        </p>
      ) : (
        match.player2 && (
          <section className="result-input">
            <input
              type="number"
              value={player1Wins}
              onChange={(event) => setP1Wins(event.currentTarget.value)}
            />
            <input
              type="number"
              value={player2Wins}
              onChange={(event) => setP2Wins(event.currentTarget.value)}
            />
            <input
              type="number"
              value={draws}
              onChange={(event) => setDraws(event.currentTarget.value)}
            />
            <Button onClick={submitResult}>Submit</Button>
          </section>
        )
      )}
    </article>
  );
}

export default Match;
