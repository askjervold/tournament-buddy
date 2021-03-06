import React, { useRef, useState } from 'react';
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
  const addPlayerRef = useRef<HTMLInputElement>(null);

  const handleInputKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') addPlayer();
  }

  const addPlayer = () => {
    setPlayers((prev) => {
      return [...prev, { name, id: players.length + 1 }];
    });
    setName('');
    addPlayerRef?.current?.focus();
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
      <h1>Set up tournament</h1>
      <ol className="player-list">
        {players.map((player, index) => (
          <li className="player" key={'player' + player.id}>
            <div>
            {
              editing === index ? (
                <>
                  <input
                    className="player-name"
                    type="text"
                    value={player.name}
                    onChange={(event) => updatePlayer(event, index)}
                  />
                  <Button onClick={() => editPlayer(-1)} inline={true}><i className="fas fa-check" /></Button>
                </>
              ) : (
                <>
                  <span className="player-name">{player.name}</span>
                  <Button onClick={() => editPlayer(index)} inline={true}><i className="fas fa-edit" /></Button>
                </>
              )
            }
            <Button onClick={() => removePlayer(index)} inline={true}><i className="fas fa-user-minus" /></Button>
            </div>
          </li>
        ))}
      </ol>

      <div className="add-player">
        <input
          ref={addPlayerRef}
          type="text"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
          onKeyPress={handleInputKeypress}
        />
        <Button onClick={addPlayer} inline={true}>Add player</Button>
      </div>

      <div className="btn-group">
        <Button onClick={cancel} inline={true} remove={true}>Cancel tournament</Button>
        {players.length > 0 &&
          <Button onClick={start} inline={true}>Start tournament</Button>
        }
      </div>
    </>
  );
}
