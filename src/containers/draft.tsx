import React from 'react';
import shuffle from 'lodash/shuffle';

import LinkButton from '../components/link-button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';

function Draft() {
  const { players } = useTournamentContext();
  const seats = shuffle(players).map((player, index) => ({
    player,
    seat: index + 1,
  }));

  return (
    <>
      <h1>Seatings</h1>
      <section className="draft-table">
        {seats.map((seat) => (
          <div key={seat.seat} className="seat">
            {seat.seat}. {seat.player.name}
          </div>
        ))}
      </section>
      <LinkButton to={Routes.TOURNAMENT}>Back to overview</LinkButton>
    </>
  );
}

export default Draft;
