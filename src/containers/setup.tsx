import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';
import { endTournament } from '../service';

export default function Setup() {
  const history = useHistory();
  const { players, setPlayers, startTournament } = useTournamentContext();
  const [name, setName] = useState<string>('');
  const [editing, setEditing] = useState<number>(-1);

  const addPlayer = () => {
    setPlayers((prev) => {
      return [...prev, { name, id: players.length + 1 }];
    });
    setName('');
  };

  const removePlayer = (index: number) => {
    setPlayers((prev) => prev.filter((player, i) => i !== index));
  };

  const updatePlayer = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const name = event.currentTarget.value;
    setPlayers((prev) => {
      return prev.map((player, i) => {
        return i === index ? { ...player, name } : player;
      });
    });
  };

  const editPlayer = (index: number) => {
    setEditing(index);
  }

  const start = () => {
    startTournament();
    history.push(Routes.TOURNAMENT);
  };

  const cancel = () => {
    endTournament();
    history.push(Routes.HOME);
  };

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Button onClick={addPlayer}>Add player</Button>
      <ul>
        {players.map((player, index) => (
          <article className="player" key={'player' + index}>
            {player.id}.&nbsp;
            {
              editing === index ? (
                <>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(event) => updatePlayer(event, index)}
                  />
                  <Button onClick={() => editPlayer(-1)}>Save</Button>
                </>
              ) : (
                <>
                  {player.name}
                  <Button onClick={() => editPlayer(index)}>Edit</Button>
                </>
              )
            }
            <Button onClick={() => removePlayer(index)}>Remove</Button>
          </article>
        ))}
      </ul>
      <Button onClick={start}>Start tournament</Button>
      <Button onClick={cancel}>Cancel tournament</Button>
    </>
  );
}
