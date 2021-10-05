import React from 'react';
import { useTournamentContext } from '../contexts/tournament-context';

export default function Tournament() {
  const { players, setPlayers } = useTournamentContext();

  const addPlayer = (_: React.MouseEvent<HTMLButtonElement>) => {
    setPlayers(prev => {
      return [...prev, { name: '' }];
    });
  }

  const removePlayer = (_: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setPlayers(prev => prev.filter((player, i) => i !== index));
  }

  const updatePlayer = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const name = event.currentTarget.value;
    setPlayers(prev => {
      return prev.map((player, i) => {
        return i === index ? { ...player, name } : player;
      });
    });
  }

  return (
    <section className="tournament">
      <ul>
        {
          players.map((player, index) =>
            <article className="player" key={'player' + index}>
              <input
                type="text"
                value={player.name}
                onChange={event => updatePlayer(event, index)}
              />
              <button onClick={event => removePlayer(event, index)}>Remove</button>
            </article>
          )
        }
      </ul>
      <button onClick={addPlayer}>Add player</button>
    </section>
  );
}
