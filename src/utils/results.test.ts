import { Match, Player, Round } from '../types';
import {
  getGameWinRatio,
  getMatchWinner,
  getMatchWinRatio,
  getOpponentGameWinRatio,
  getOpponentMatchWinRatio,
  normalizeMatch,
} from './results';

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
const fiveRoundTournament: Round[] = [
  {
    number: 1,
    matches: [
      {
        player1: jace,
        player2: garruk,
        result: {
          player1Wins: 2,
          player2Wins: 0,
          draws: 0,
        },
      },
      {
        player1: bolas,
        player2: chandra,
        result: {
          player1Wins: 2,
          player2Wins: 0,
          draws: 0,
        },
      },
    ],
  },
  {
    number: 2,
    matches: [
      {
        player1: jace,
        player2: chandra,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
    ],
  },
  {
    number: 3,
    matches: [
      {
        player1: jace,
        player2: elspeth,
        result: {
          player1Wins: 1,
          player2Wins: 1,
          draws: 1,
        },
      },
      {
        player1: chandra,
        player2: garruk,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
    ],
  },
  {
    number: 4,
    matches: [
      {
        player1: jace,
        player2: liliana,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
      {
        player1: chandra,
        player2: elspeth,
        result: {
          player1Wins: 0,
          player2Wins: 2,
          draws: 0,
        },
      },
    ],
  },
  {
    number: 5,
    matches: [
      {
        player1: bolas,
        player2: jace,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
    ],
  },
];
const twoRoundTournament: Round[] = [
  {
    number: 1,
    matches: [
      {
        player1: jace,
        player2: garruk,
        result: {
          player1Wins: 2,
          player2Wins: 0,
          draws: 0,
        },
      },
      {
        player1: chandra,
        player2: elspeth,
        result: {
          player1Wins: 0,
          player2Wins: 2,
          draws: 0,
        },
      },
    ],
  },
  {
    number: 2,
    matches: [
      {
        player1: jace,
        player2: elspeth,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
      {
        player1: chandra,
        player2: garruk,
        result: {
          player1Wins: 2,
          player2Wins: 1,
          draws: 0,
        },
      },
    ],
  },
];

describe('getMatchWinner', () => {
  test('returns null if both players have the same amount of wins (there is no winner)', () => {
    const match: Match = {
      table: '1',
      player1: chandra,
      player2: jace,
      result: {
        player1Wins: 1,
        player2Wins: 1,
        draws: 1,
      },
    };
    expect(getMatchWinner(match)).toBeNull();
  });

  test('returns player1 if they won more games', () => {
    const match: Match = {
      table: '1',
      player1: chandra,
      player2: jace,
      result: {
        player1Wins: 2,
        player2Wins: 1,
        draws: 0,
      },
    };
    expect(getMatchWinner(match)).toEqual(chandra);
  });

  test('returns player2 if they won more games (regardless of drawn games)', () => {
    const match: Match = {
      table: '1',
      player1: chandra,
      player2: jace,
      result: {
        player1Wins: 0,
        player2Wins: 1,
        draws: 1,
      },
    };
    expect(getMatchWinner(match)).toEqual(jace);
  });
});

describe('normalizeMatch', () => {
  test('returns match from the perspective of a given player', () => {
    const match1: Match = {
      table: '1',
      player1: jace,
      player2: chandra,
      result: {
        player1Wins: 0,
        player2Wins: 2,
        draws: null,
      },
    };
    const match2: Match = {
      table: '1',
      player1: jace,
      player2: elspeth,
      result: {
        player1Wins: 1,
        player2Wins: 1,
        draws: 1,
      },
    };

    expect(normalizeMatch(jace, match1)).toEqual({
      player: jace,
      opponent: chandra,
      winner: chandra,
      result: {
        playerWins: 0,
        opponentWins: 2,
        draws: 0,
      },
    });
    expect(normalizeMatch(elspeth, match2)).toEqual({
      player: elspeth,
      opponent: jace,
      winner: null,
      result: {
        playerWins: 1,
        opponentWins: 1,
        draws: 1,
      },
    });
  });
});

describe('getMatchWinRatio', () => {
  test('returns fraction of matches won by player', () => {
    expect(getMatchWinRatio(jace, fiveRoundTournament)).toEqual(0.6);
    expect(getMatchWinRatio(bolas, fiveRoundTournament)).toEqual(1);
  });

  test('returns 0.33 if real value lower', () => {
    expect(getMatchWinRatio(chandra, fiveRoundTournament)).toEqual(0.33);
    expect(getMatchWinRatio(garruk, fiveRoundTournament)).toEqual(0.33);
  });
});

describe('getOpponentMatchWinRatio', () => {
  test('returns mean of match win ratios of opponents', () => {
    expect(getOpponentMatchWinRatio(jace, twoRoundTournament)).toEqual(0.415);
    expect(getOpponentMatchWinRatio(elspeth, twoRoundTournament)).toEqual(0.75);
  });
});

describe('getGameWinRatio', () => {
  test('returns fraction of games won by player', () => {
    expect(getGameWinRatio(elspeth, twoRoundTournament)).toEqual(0.6);
    expect(getGameWinRatio(jace, twoRoundTournament)).toEqual(0.8);
    expect(getGameWinRatio(chandra, twoRoundTournament)).toEqual(0.4);
    expect(getGameWinRatio(garruk, twoRoundTournament)).toEqual(0.2);
  });
});

describe('getOpponentGameWinRatio', () => {
  test('returns fraction of games won by player', () => {
    expect(getOpponentGameWinRatio(elspeth, twoRoundTournament)).toEqual(0.6);
    expect(getOpponentGameWinRatio(jace, twoRoundTournament)).toEqual(0.4);
    expect(getOpponentGameWinRatio(chandra, twoRoundTournament)).toEqual(0.4);
    expect(getOpponentGameWinRatio(garruk, twoRoundTournament)).toEqual(0.6);
  });
});
