export type Player = {
  id: number;
  name: string;
};

export type Match = {
  table: string;
  player1: Player;
  player2: Player | null;
  result: MatchResult;
  submitted?: boolean;
};

export type MatchResult = {
  player1Wins: number | null;
  player2Wins: number | null;
  draws: number | null;
};

export type Round = {
  number: number;
  matches: Match[];
  ended?: boolean;
};

export type PlayerStats = {
  player: Player;
  record: Record;
  opponentMatchWin: number;
  gameWin: number;
  opponentGameWin: number;
};

export type Record = {
  wins: number;
  losses: number;
  draws: number;
};

export type ScoreBrackets = {
  [score: number]: PlayerStats[];
};
