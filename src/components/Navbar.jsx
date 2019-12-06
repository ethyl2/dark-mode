import React from 'react';
import { NavLink } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = ( props ) => {
  const [darkMode, setDarkMode] = useDarkMode(false);
  const toggleMode = e => {
    e.preventDefault();
    setDarkMode(!darkMode);
    darkMode? props.setStrokeColor('#8884d8') : props.setStrokeColor('#F7931A');
  };
  return (
    <nav className="navbar">
      <h1>Crypto Tracker</h1>
      <NavLink exact to='/'>All Coins</NavLink>
      <NavLink to='/coins'>More Coin Info</NavLink>
      <div className="dark-mode__toggle">
        <div
          onClick={toggleMode}
          className={darkMode ? 'toggle toggled' : 'toggle'}
        />
      </div>
    </nav>
  );
};

export default Navbar;
