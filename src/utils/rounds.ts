import shuffle from 'lodash/shuffle';
import { Match, Player } from '../types';

export const getRandomPairings = (players: Player[]) => {
  const shuffledPlayers = shuffle(players);
  const matches: Match[] = [];
  let table = 1;
  while (shuffledPlayers.length > 0) {
    matches.push({
      table: table.toString(),
      player1: shuffledPlayers.shift()!,
      player2: shuffledPlayers.shift() || null
    });
    table++;
  }
  return matches;
}
