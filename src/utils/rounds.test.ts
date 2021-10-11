import { Player, Round } from '../types';
import { getRandomPairings, getSwissPairings } from './rounds';

const elspeth: Player = {
  id: 1,
  name: 'Elspeth Tirel',
};
const jace: Player = {
  id: 2,
  name: 'Jace Beleren',
};
const liliana: Player = {
  id: 3,
  name: 'Liliana Vess',
};
const chandra: Player = {
  id: 4,
  name: 'Chandra Nalaar',
};
const garruk: Player = {
  id: 5,
  name: 'Garruk Wildspeaker',
};
const bolas: Player = {
  id: 6,
  name: 'Nicol Bolas',
};
const monocolored = [elspeth, jace, liliana, chandra, garruk];

describe('getRandomPairings', () => {
  test(
    'returns list of matches with one match per pair' +
      '(with an extra for the unpaired player)',
    () => {
      const matches = getRandomPairings(monocolored);
      expect(matches.length).toEqual(3);
      expect(matches[matches.length - 1].player2).toBeNull();
    }
  );
});

describe('getSwissPairings', () => {
  const round1: Round = {
    number: 1,
    matches: [
      {
        player1: elspeth,
        player2: jace,
        result: {
          player1Wins: 2,
          player2Wins: 0,
          draws: 0,
        },
      },
      {
        player1: liliana,
        player2: chandra,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
      {
        player1: bolas,
        player2: garruk,
        result: {
          player1Wins: 2,
          player2Wins: 0,
          draws: 0,
        },
      },
    ],
  };

  test('pairs players based on score', () => {
    const pairings = getSwissPairings(
      [elspeth, jace, liliana, chandra, garruk, bolas],
      [round1]
    );
    console.log(pairings);
  });
});
