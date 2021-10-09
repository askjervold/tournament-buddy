export type Player = {
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
