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
      <h1>Standings after {rounds.length} round{rounds.length > 1 ? 's' : ''}</h1>
      <table className="standings">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Score</th>
            <th className="tiebreaker">OMW%</th>
            <th className="tiebreaker">GW%</th>
            <th className="tiebreaker">OGW%</th>
            <th className="tiebreaker mobile">Tiebreakers</th>
          </tr>
        </thead>
        <tbody>
        {standings.map((player, index) => (
          <tr key={player.player.id}>
            <td>{index + 1}</td>
            <td>{player.player.name}</td>
            <td>{getScore(player.record)}</td>
            <td className="tiebreaker">{formatPercentage(player.opponentMatchWin)}</td>
            <td className="tiebreaker">{formatPercentage(player.gameWin)}</td>
            <td className="tiebreaker">{formatPercentage(player.opponentGameWin)}</td>
          </tr>
        ))}
        </tbody>
      </table>
      <LinkButton to={Routes.TOURNAMENT}>Back to overview</LinkButton>
    </>
  ) : (
    <p>No rounds played</p>
  );
}

export default Standings;
