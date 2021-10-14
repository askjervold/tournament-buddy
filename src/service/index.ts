import { Player, Round, Tournament } from '../types';

const TOURNAMENT_STORAGE_KEY = 'LOCAL_TOURNAMENT';

export const getTournament = (): Tournament | null => {
  const storedTournament = localStorage.getItem(TOURNAMENT_STORAGE_KEY);
  return storedTournament ? JSON.parse(storedTournament) : null;
};

export const saveTournament = (
  players: Player[],
  rounds: Round[],
  started: boolean
) => {
  localStorage.setItem(
    TOURNAMENT_STORAGE_KEY,
    JSON.stringify({ players, rounds, started })
  );
};

export const endTournament = () => {
  localStorage.removeItem(TOURNAMENT_STORAGE_KEY);
};
