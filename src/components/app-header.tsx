import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import Routes from '../constants/routes';

function AppHeader() {
  const location = useLocation();
  if (location.pathname === Routes.HOME) return null;

  return (
    <header id="app-header">
      <Link className="home-link" to={Routes.HOME}>Tournament Buddy</Link>
    </header>
  )
}

export default AppHeader;
