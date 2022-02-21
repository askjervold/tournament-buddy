import React from 'react';
import truncate from 'lodash/truncate';

import LinkButton from '../components/link-button';
import Routes from '../constants/routes';
import { useTournamentContext } from '../contexts/tournament-context';
import { getScore, getStandings } from '../utils/results';

function Standings() {
  const { players, rounds } = useTournamentContext();
  const standings = getStandings(players, rounds);
  const formatPercentage = (value: number): string => {
    const percentage = value * 100;
    return truncate(percentage.toString(), {
      length: 7,
      omission: '',
    });
  };

  return rounds.length > 0 ? (
    <>
      <h1>
        Standings after {rounds.length} round{rounds.length > 1 ? 's' : ''}
      </h1>
      <table className="standings">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Score</th>
            <th className="tiebreaker sm">OMW%</th>
            <th className="tiebreaker sm">GW%</th>
            <th className="tiebreaker sm">OGW%</th>
            <th className="tiebreaker mobile">Tiebreakers</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((player, index) => (
            <tr key={player.player.id}>
              <td>{index + 1}</td>
              <td>{player.player.name}</td>
              <td>{getScore(player.record)}</td>
              <td className="tiebreaker sm">
                {formatPercentage(player.opponentMatchWin)}
              </td>
              <td className="tiebreaker sm">
                {formatPercentage(player.gameWin)}
              </td>
              <td className="tiebreaker sm">
                {formatPercentage(player.opponentGameWin)}
              </td>
              <td className="tiebreaker mobile">
                {formatPercentage(player.opponentMatchWin)}/
                {formatPercentage(player.gameWin)}/
                {formatPercentage(player.opponentGameWin)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LinkButton to={Routes.TOURNAMENT}>Back to overview</LinkButton>
    </>
  ) : (
    <>
      <p>No rounds played</p>
      <LinkButton to={Routes.TOURNAMENT}>Back to overview</LinkButton>
    </>
  );
}

export default Standings;
