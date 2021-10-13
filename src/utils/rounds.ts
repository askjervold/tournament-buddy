import includes from 'lodash/includes';
import shuffle from 'lodash/shuffle';
import { Match, Player, PlayerStats, Round } from '../types';
import { getOpponents, getPlayerStats, getScore } from './results';

type Pairing = {
  player1: Player;
  player2: Player | null;
  penalty: number;
};

type PairingsScenario = {
  pairings: Pairing[];
  penalty: number;
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

export const getSwissPairings = (players: Player[], rounds: Round[]) => {
  const scenarios = generateScenarios([], players, rounds);
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

const getPairingPenalty = (player1: PlayerStats, player2: PlayerStats) => {
  return Math.pow(getScore(player1.record) - getScore(player2.record), 2);
};

const getAllowedPairingsForPlayer = (
  player1: Player,
  opponents: Player[],
  rounds: Round[]
): Pairing[] => {
  const ineligible: Player[] = getOpponents(player1, rounds);
  return opponents
    .map((player2) =>
      includes(ineligible, player2)
        ? null
        : getPairing(player1, player2, rounds)
    )
    .filter((pairing) => pairing !== null) as Pairing[];
};

const getPairing = (
  player1: Player,
  player2: Player | null,
  rounds: Round[]
): Pairing => {
  return {
    player1,
    player2,
    penalty: player2
      ? getPairingPenalty(
          getPlayerStats(player1, rounds),
          getPlayerStats(player2, rounds)
        )
      : -1,
  };
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
  rounds: Round[]
): PairingsScenario[] => {
  if (players.length === 0) return scenarios;
  if (players.length === 1)
    return scenarios.map((scenario) =>
      addPairingToScenario(scenario, getPairing(players[0], null, rounds))
    );

  const player1 = players.shift()!;
  const player1PairingOptions = getAllowedPairingsForPlayer(
    player1,
    players,
    rounds
  );

  if (player1PairingOptions.length === 0) {
    return scenarios;
  }

  if (scenarios.length === 0) {
    return player1PairingOptions.flatMap((pairing) =>
      generateScenarios(
        [addPairingToScenario({ pairings: [], penalty: -1 }, pairing)],
        players.filter((p) => p.id !== pairing.player2?.id),
        rounds
      )
    );
  } else {
    return scenarios.flatMap((scenario) => {
      return player1PairingOptions.flatMap((pairing) =>
        generateScenarios(
          [addPairingToScenario(scenario, pairing)],
          players.filter((p) => p.id !== pairing.player2?.id),
          rounds
        )
      );
    });
  }
};
