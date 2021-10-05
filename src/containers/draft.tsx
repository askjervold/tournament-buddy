import React from 'react';
import { useTournamentContext } from '../contexts/tournament-context';

function Draft() {
  const { players } = useTournamentContext();

  return (
    <>
      <h1>Seatings</h1>
      <section className="draft-table">
        {players.map(player => <div className="seat">{player.name}</div>)}
      </section>
    </>
  );
}

export default Draft;
