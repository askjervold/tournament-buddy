import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';

export default function Setup() {
  const history = useHistory();
  const { players, setPlayers, startTournament } = useTournamentContext();

  const addPlayer = () => {
    setPlayers(prev => {
      return [...prev, { name: '' }];
    });
  }

  const removePlayer = (index: number) => {
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

  const start = () => {
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
              <Button onClick={() => removePlayer(index)}>Remove</Button>
            </article>
          )
        }
      </ul>
      <Button onClick={addPlayer}>Add player</Button>
      <Button onClick={start}>Start tournament</Button>
    </>
  );
}
