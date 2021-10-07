import React, { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Player, Round } from '../types';

type TournamentContextType = {
  started: boolean;
  startTournament: Function;
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  rounds: Round[];
  setRounds: Dispatch<SetStateAction<Round[]>>;
};

const initialTournamentContext: TournamentContextType = {
  started: false,
  startTournament: () => {},
  players: [],
  setPlayers: (players: SetStateAction<Player[]>) => {},
  rounds: [],
  setRounds: (rounds: SetStateAction<Round[]>) => {},
};

const Context = createContext(initialTournamentContext);

export default function TournamentContext({ children }: PropsWithChildren<ReactNode>) {
  const [started, setStarted] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  const startTournament = () => {
    setStarted(true);
  }

  return (
    <Context.Provider
      value={{
        started,
        startTournament,
        players,
        setPlayers,
        rounds,
        setRounds,
      }}
    >
      { children }
    </Context.Provider>
  );
};

export const useTournamentContext = () => useContext(Context);
