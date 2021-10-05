export type Player = {
  name: string;
};

export type Match = {
  table: string;
  player1: Player;
  player2: Player;
};

export type Round = {
  number: Number;
  matches: Match[];
};
