import PointValues from '../constants/pointValues';
import { Match, Player, PlayerStats, Record, Round } from '../types';

type NormalizedMatch = {
  opponent: Player;
  result: NormalizedMatchResult;
}

type NormalizedMatchResult = {
  playerWins: number;
  opponentWins: number;
  draws: number;
}

const normalizeMatch = (player: Player, match: Match): NormalizedMatch => {
  const { player1Wins, player2Wins, draws } = match.result;
  if (!match.player2 || match.player2.id !== player.id) {
    return {
      opponent: match.player2!,
      result: {
        playerWins: player1Wins || 0,
        opponentWins: player2Wins || 0,
        draws: draws || 0
      }
    };
  } else {
    return {
      opponent: match.player1,
      result: {
        playerWins: player2Wins || 0,
        opponentWins: player1Wins || 0,
        draws: draws || 0
      }
    };
  }
}

const getMatchesForPlayer = (player: Player, rounds: Round[]): NormalizedMatch[] => {
  return rounds
    .reduce((accumulator, current) => {
      return { ...current, matches: [...accumulator.matches, ...current.matches] };
    })
    .matches
    .filter(match => match.player1.id === player.id || match.player2?.id === player.id)
    .map(match => normalizeMatch(player, match));
}

export const getOpponents = (player: Player, rounds: Round[]): Player[] => {
  const matches = getMatchesForPlayer(player, rounds);
  const opponents: Player[] = [];
  matches.forEach(match => {
    if (!match.opponent) return;
    opponents.push(match.opponent);
  });
  return opponents;
}

const getRecord = (player: Player, rounds: Round[]): Record => {
  const matches = getMatchesForPlayer(player, rounds);
  const record: Record = { wins: 0, losses: 0, draws: 0 };
  matches.forEach(match => {
    if (!match.opponent) {
      record.wins++;
      return;
    }
    
    const { playerWins, opponentWins } = match.result;
    if (playerWins > opponentWins) record.wins++;
    else if (opponentWins > playerWins) record.losses++;
    else record.draws++;
  });
  return record;
}

export const getScore = (record: Record) => {
  return PointValues.WIN * record.wins
    + PointValues.DRAW * record.draws
    + PointValues.LOSS * record.losses;
}

const getOpponentMatchWinRatio = (player: Player, rounds: Round[]) => {
  return 0;
}

const getGameWinRatio = (player: Player, rounds: Round[]) => {
  return 0;
}

const getOpponentGameWinRatio = (player: Player, rounds: Round[]) => {
  return 0;
}

export const getPlayerStats = (player: Player, rounds: Round[]): PlayerStats => {
  return {
    record: getRecord(player, rounds),
    opponentMatchWin: getOpponentMatchWinRatio(player, rounds),
    gameWin: getGameWinRatio(player, rounds),
    opponentGameWin: getOpponentGameWinRatio(player, rounds)
  };
}
