import PointValues from '../constants/pointValues';
import { Match, Player, PlayerStats, Record, Round } from '../types';

const getMatchesForPlayer = (player: Player, rounds: Round[]): Match[] => {
  const matches = rounds.reduce((accumulator, current) => {
    return { ...current, matches: [...accumulator.matches, ...current.matches] };
  }).matches;
  return matches.filter(match => match.player1.id === player.id || match.player2?.id === player.id);
}

export const getOpponents = (player: Player, rounds: Round[]): Player[] => {
  const matches = getMatchesForPlayer(player, rounds);
  const opponents: Player[] = [];
  matches.forEach(match => {
    const { player1, player2 } = match;
    if (!player2) return;

    const opponent = player1.id === player.id ? player2 : player1;
    opponents.push(opponent);
  });
  return opponents;
}

const getRecord = (player: Player, rounds: Round[]): Record => {
  const matches = getMatchesForPlayer(player, rounds);
  const record: Record = { wins: 0, losses: 0, draws: 0 };
  matches.forEach(match => {
    if (!match.player2) {
      record.wins++;
      return;
    }
    const p1 = match.result.player1Wins || 0;
    const p2 = match.result.player2Wins || 0;
    if (p1 > p2) player.id === match.player1.id ? record.wins++ : record.losses++;
    else if (p2 > p1) player.id === match.player2.id ? record.wins++ : record.losses++;
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
