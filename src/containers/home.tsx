import React from 'react';
import { useHistory } from 'react-router-dom';
import Routes from '../constants/routes';

function Home() {
  const history = useHistory();

  const createTournament = (event: React.MouseEvent<HTMLButtonElement>) => {
    /**
     * TODO: This will actually create a tournament in the database later
     * For now, we just navigate to the Tournament route
     **/
    history.push(Routes.TOURNAMENT);
  }

  return (
    <button onClick={createTournament}>Create tournament</button>
  );
}

export default Home;
