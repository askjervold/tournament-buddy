import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTournament, saveTournament } from '../service';
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

export default function TournamentContext({
  children,
}: PropsWithChildren<ReactNode>) {
  const [started, setStarted] = useState<boolean>(
    initialTournamentContext.started
  );
  const [players, setPlayers] = useState<Player[]>(
    initialTournamentContext.players
  );
  const [rounds, setRounds] = useState<Round[]>(
    initialTournamentContext.rounds
  );

  const startTournament = () => {
    setStarted(true);
    saveTournament(players, rounds, true);
  };

  useEffect(() => {
    const tournament = getTournament();
    if (tournament) {
      setPlayers(tournament.players);
      setRounds(tournament.rounds);
      setStarted(tournament.started);
    }
  }, []);

  useEffect(() => {
    saveTournament(players, rounds, started);
  }, [players, rounds, started]);

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
      {children}
    </Context.Provider>
  );
}

export const useTournamentContext = () => useContext(Context);
