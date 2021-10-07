import React from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';

export default function Setup() {
  const history = useHistory();
  const { players, setPlayers, startTournament } = useTournamentContext();

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

  const start = (_: React.MouseEvent<HTMLButtonElement>) => {
    startTournament();
    history.push(Routes.TOURNAMENT);
  }

  return (
    <>
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
      <button onClick={start}>Start tournament</button>
    </>
  );
}
