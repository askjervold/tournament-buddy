export type Player = {
  name: string;
};

export type Match = {
  table: string;
  player1: Player;
  player2: Player | null;
};

export type Round = {
  number: number;
  matches: Match[];
  ended?: boolean;
};
