import React from 'react';
import truncate from 'lodash/truncate';
import { Link } from 'react-router-dom';
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
      <h1>Standings after {rounds.length} rounds</h1>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Score</th>
            <th>OMW%</th>
            <th>GW%</th>
            <th>OGW%</th>
          </tr>
        </thead>
        <tbody>
        {standings.map((player, index) => (
          <tr key={player.player.id}>
            <td>{index + 1}</td>
            <td>{player.player.name}</td>
            <td>{getScore(player.record)}</td>
            <td>{formatPercentage(player.opponentMatchWin)}</td>
            <td>{formatPercentage(player.gameWin)}</td>
            <td>{formatPercentage(player.opponentGameWin)}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <Link to={Routes.TOURNAMENT}>Back to overview</Link>
    </>
  ) : (
    <p>No rounds played</p>
  );
}

export default Standings;
