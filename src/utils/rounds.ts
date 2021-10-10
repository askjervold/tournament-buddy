import shuffle from 'lodash/shuffle';
import { Match, Player } from '../types';

export const getRandomPairings = (players: Player[]) => {
  const shuffledPlayers = shuffle(players);
  const matches: Match[] = [];
  let table = 1;
  while (shuffledPlayers.length > 0) {
    const player1 = shuffledPlayers.shift()!,
      player2 = shuffledPlayers.shift() || null;
    matches.push({
      table: table.toString(),
      player1,
      player2,
      result: {
        player1Wins: player2 ? null : 0,
        player2Wins: player2 ? null : 0,
        draws: player2 ? null : 0,
      },
    });
    table++;
  }
  return matches;
};
