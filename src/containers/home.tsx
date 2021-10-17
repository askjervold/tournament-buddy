import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/button';
import Routes from '../constants/routes';

function Home() {
  const history = useHistory();

  const createTournament = () => {
    /**
     * TODO: This will actually create a tournament in the database later
     * For now, we just navigate to the Tournament route
     **/
    history.push(Routes.TOURNAMENT + Routes.SETUP);
  };

  return (
    <>
      <h1>Tournament Buddy</h1>
      <Button onClick={createTournament}>Create tournament</Button>
    </>
  );
}

export default Home;
