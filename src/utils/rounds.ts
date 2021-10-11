import shuffle from 'lodash/shuffle';
import { Match, MatchResult, Player, Round } from '../types';
import { getBrackets } from './results';

type PairDownResult = {
  pairedDownMatch: Match;
  lowerBracketRemainder: Player[];
};

const emptyResult: MatchResult = {
  player1Wins: null,
  player2Wins: null,
  draws: null,
};

export const getRandomPairings = (players: Player[]): Match[] => {
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

export const getPossiblePairings = (players: Player[]): Match[] => {
  const possiblePairings: Match[] = [];
  do {
    const player1 = players.pop()!;
    players.forEach((player2) => {
      possiblePairings.push({
        player1,
        player2,
        result: { ...emptyResult },
      });
    });
  } while (players.length > 1);
  return possiblePairings;
};

export const pairDown = (
  pairedDownMatch: Match,
  opponents: Player[]
): PairDownResult => {
  const shuffledBracket = shuffle(opponents);
  const player2 = shuffledBracket.shift()!;
  return {
    pairedDownMatch: { ...pairedDownMatch, player2 },
    lowerBracketRemainder: opponents,
  };
};

export const getSwissPairings = (players: Player[], rounds: Round[]) => {
  const brackets = getBrackets(players, rounds);
  const scores = Object.keys(brackets)
    .map((key) => parseInt(key, 10))
    .sort((a, b) => b - a);
  let matches: Match[] = [];
  do {
    const upperBracketScore = scores.shift()!;
    const upperBracket = brackets[upperBracketScore].map(
      (stat) => players.find((player) => player.id === stat.player.id)!
    );
    const sameScorePairings = getRandomPairings(upperBracket);

    matches = [...matches, ...sameScorePairings];
  } while (scores.length > 0);
  return matches;
};
