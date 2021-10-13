import includes from 'lodash/includes';
import shuffle from 'lodash/shuffle';
import { REPEAT_OPPONENT_PENALTY } from '../constants/results';
import { Match, Player, PlayerStats, Round } from '../types';
import {
  getOpponents,
  getPlayerStats,
  getScore,
  getStandings,
} from './results';

type Pairing = {
  player1: Player;
  player2: Player | null;
  penalty: number;
};

type PairingsScenario = {
  pairings: Pairing[];
  penalty: number;
};

export const getRandomPairings = (players: Player[]): Pairing[] => {
  const shuffledPlayers = shuffle(players);
  const pairings: Pairing[] = [];
  while (shuffledPlayers.length > 0) {
    const player1 = shuffledPlayers.shift()!,
      player2 = shuffledPlayers.shift() || null;
    pairings.push(getPairing(player1, player2));
  }
  return pairings;
};

export const getSwissPairings = (
  players: Player[],
  rounds: Round[],
  allowRepeatOpponents: boolean
) => {
  const scenarios = generateScenarios(
    [],
    players,
    rounds,
    allowRepeatOpponents
  );
  const expectedNumberOfRoundsInScenario = Math.ceil(players.length / 2);
  const validScenarios = scenarios.filter(
    (scenario) => scenario.pairings.length === expectedNumberOfRoundsInScenario
  );
  const scoredScenarios = validScenarios
    .map((scenario) => {
      let combinedPenalty = 0;
      scenario.pairings.forEach((pairing) => {
        combinedPenalty += pairing.penalty;
      });
      return {
        pairings: scenario.pairings,
        penalty: combinedPenalty,
      };
    })
    .sort((a, b) => a.penalty - b.penalty);
  const bestScenarios = scoredScenarios.filter(
    (scenario) => scenario.penalty === scoredScenarios[0].penalty
  );
  return shuffle(bestScenarios)[0].pairings;
};

export const getMatchesFromPairings = (pairings: Pairing[]): Match[] => {
  return pairings.map((pairing, index) => ({
    table: (index + 1).toString(),
    player1: pairing.player1,
    player2: pairing.player2,
    result: {
      player1Wins: null,
      player2Wins: null,
      draws: null,
    },
  }));
};

const getPairing = (
  player1: Player,
  player2: Player | null,
  rounds?: Round[],
  isRepeatOpponent?: boolean
): Pairing => {
  return {
    player1,
    player2,
    penalty:
      player2 && rounds
        ? getPairingPenalty(
            getPlayerStats(player1, rounds),
            getPlayerStats(player2, rounds)
          )
        : -1,
  };
};

const getPairingPenalty = (
  player1: PlayerStats,
  player2: PlayerStats,
  isRepeatOpponent: boolean = false
) => {
  const repeatPenalty = isRepeatOpponent ? REPEAT_OPPONENT_PENALTY : 0;
  return (
    Math.pow(getScore(player1.record) - getScore(player2.record), 2) +
    repeatPenalty
  );
};

const getAllowedPairingsForPlayer = (
  player1: Player,
  opponents: Player[],
  rounds: Round[],
  allowRepeatOpponents: boolean
): Pairing[] => {
  const ineligible: Player[] = getOpponents(player1, rounds);
  return opponents
    .map((player2) => {
      const priorOpponent: boolean = includes(ineligible, player2);
      if (priorOpponent && !allowRepeatOpponents) return null;
      return getPairing(player1, player2, rounds, priorOpponent);
    })
    .filter((pairing) => pairing !== null) as Pairing[];
};

const addPairingToScenario = (
  scenario: PairingsScenario,
  pairing: Pairing
): PairingsScenario => {
  return { ...scenario, pairings: [...scenario.pairings, pairing] };
};

const generateScenarios = (
  scenarios: PairingsScenario[],
  players: Player[],
  rounds: Round[],
  allowRepeatOpponents: boolean
): PairingsScenario[] => {
  if (players.length === 0) return scenarios;
  if (players.length === 1)
    return scenarios.map((scenario) =>
      addPairingToScenario(scenario, getPairing(players[0], null, rounds))
    );

  const sortedPlayers = getStandings(players, rounds).map((p) => p.player);
  const player1 = sortedPlayers.shift()!;
  const player1PairingOptions = getAllowedPairingsForPlayer(
    player1,
    sortedPlayers,
    rounds,
    allowRepeatOpponents
  );

  if (player1PairingOptions.length === 0) {
    return scenarios;
  }

  if (scenarios.length === 0) {
    return player1PairingOptions.flatMap((pairing) =>
      generateScenarios(
        [addPairingToScenario({ pairings: [], penalty: -1 }, pairing)],
        sortedPlayers.filter((p) => p.id !== pairing.player2?.id),
        rounds,
        allowRepeatOpponents
      )
    );
  } else {
    return scenarios.flatMap((scenario) => {
      return player1PairingOptions.flatMap((pairing) =>
        generateScenarios(
          [addPairingToScenario(scenario, pairing)],
          sortedPlayers.filter((p) => p.id !== pairing.player2?.id),
          rounds,
          allowRepeatOpponents
        )
      );
    });
  }
};
