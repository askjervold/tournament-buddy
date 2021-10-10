import PointValues from '../constants/pointValues';
import { Match, Player, PlayerStats, Record, Round, ScoreBrackets } from '../types';

type NormalizedMatch = {
  player: Player;
  opponent: Player;
  winner: Player | null;
  result: NormalizedMatchResult;
}

type NormalizedMatchResult = {
  playerWins: number;
  opponentWins: number;
  draws: number;
}

const getMatchWinner = (match: Match): Player | null => {
  const { player1Wins, player2Wins } = match.result;
  if (player1Wins === player2Wins) return null;
  return (player1Wins || 0) > (player2Wins || 0) ?
    match.player1 : match.player2;
}

const normalizeMatch = (player: Player, match: Match): NormalizedMatch => {
  const { player1Wins, player2Wins, draws } = match.result;
  if (!match.player2 || match.player2.id !== player.id) {
    return {
      player: match.player1,
      opponent: match.player2!,
      winner: getMatchWinner(match),
      result: {
        playerWins: player1Wins || 0,
        opponentWins: player2Wins || 0,
        draws: draws || 0
      }
    };
  } else {
    return {
      player: match.player2,
      opponent: match.player1,
      winner: getMatchWinner(match),
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
    
    if (!match.winner) record.draws++;
    else match.winner.id === player.id ? record.wins++ : record.losses++;
  });
  return record;
}

export const getScore = (record: Record) => {
  return PointValues.WIN * record.wins
    + PointValues.DRAW * record.draws
    + PointValues.LOSS * record.losses;
}

const getMatchWinRatio = (player: Player, rounds: Round[]) => {
  const matches = getMatchesForPlayer(player, rounds);
  let played = 0, won = 0; 
  matches.forEach(match => {
    played++;
    if (match.winner?.id === player.id) won++;
  })
  return won/played;
}

const getOpponentMatchWinRatio = (player: Player, rounds: Round[]) => {
  const opponents = getOpponents(player, rounds);
  const omw = opponents.map(opp => getMatchWinRatio(opp, rounds));
  return omw.reduce((acc, curr) => acc + curr)/omw.length;
}

const getGameWinRatio = (player: Player, rounds: Round[]) => {
  const matches = getMatchesForPlayer(player, rounds);
  let games = 0, wins = 0; 
  matches.forEach(match => {
    const { playerWins, opponentWins, draws } = match.result;
    games += playerWins + opponentWins + draws;
    wins += playerWins;
  })
  return wins/games;
}

const getOpponentGameWinRatio = (player: Player, rounds: Round[]) => {
  const opponents = getOpponents(player, rounds);
  const ogw = opponents.map(opp => getGameWinRatio(opp, rounds));
  return ogw.reduce((acc, curr) => acc + curr)/ogw.length;
}

export const getPlayerStats = (player: Player, rounds: Round[]): PlayerStats => {
  return {
    player: player,
    record: getRecord(player, rounds),
    opponentMatchWin: getOpponentMatchWinRatio(player, rounds),
    gameWin: getGameWinRatio(player, rounds),
    opponentGameWin: getOpponentGameWinRatio(player, rounds)
  };
}

const compareStats = (p1: PlayerStats, p2: PlayerStats): number => {
  const p1score = getScore(p1.record), p2score = getScore(p2.record);
  if (p1score !== p2score) return p2score - p1score;
  if (p1.opponentMatchWin !== p2.opponentMatchWin) return p2.opponentMatchWin - p1.opponentMatchWin;
  if (p1.gameWin !== p2.gameWin) return p2.gameWin - p1.gameWin;
  return p2.opponentGameWin - p1.opponentGameWin;
}

export const getStandings = (players: Player[], rounds: Round[]): PlayerStats[] => {
  const stats: PlayerStats[] = players
    .map(player => getPlayerStats(player, rounds));
  return stats.sort(compareStats);
}

export const getBrackets = (players: Player[], rounds: Round[]): ScoreBrackets => {
  const standings = getStandings(players, rounds);
  const brackets: ScoreBrackets = {};
  standings.forEach(playerStat => {
    const score = getScore(playerStat.record);
    if (brackets[score]) brackets[score].push(playerStat);
    else brackets[score] = [playerStat];
  });
  return brackets;
}
