import React from 'react';
import { Link } from 'react-router-dom';
import shuffle from 'lodash/shuffle';

import { useTournamentContext } from '../contexts/tournament-context';
import Routes from '../constants/routes';

function Draft() {
  const { players } = useTournamentContext();
  const seats = shuffle(players)
    .map((player, index) => ({ player, seat: index + 1 }));

  return (
    <>
      <h1>Seatings</h1>
      <section className="draft-table">
        {seats.map(seat =>
          <div key={seat.seat} className="seat">{seat.seat}. {seat.player.name}</div>
        )}
      </section>
      <Link to={Routes.TOURNAMENT}>Back to overview</Link>
    </>
  );
}

export default Draft;
