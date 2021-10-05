import React, { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useContext, useState } from 'react';
import { Player, Round } from '../types';

type TournamentContextType = {
  players: Player[];
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  rounds: Round[];
  setRounds: Dispatch<SetStateAction<Round[]>>;
};

const initialTournamentContext: TournamentContextType = {
  players: [],
  setPlayers: (players: SetStateAction<Player[]>) => {},
  rounds: [],
  setRounds: (rounds: SetStateAction<Round[]>) => {},
};

const Context = createContext(initialTournamentContext);

export default function TournamentContext({ children }: PropsWithChildren<ReactNode>) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [rounds, setRounds] = useState<Round[]>([]);

  return (
    <Context.Provider
      value={{
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
