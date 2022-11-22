import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { FlagSelect } from '../UI/FlagSelect/FlagSelect';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__logo">
          <Link className="navbar__link" to="/">
            RS Project Management App
          </Link>
        </div>
        <div className="navbar__links">
          <Link className="navbar__link" to="/boards">
            <DashboardIcon />
            Boards
          </Link>
          <Link className="navbar__link" to="/create">
            <DashboardCustomizeIcon />
            New board
          </Link>
          <Link className="navbar__link" to="/profile">
            <Person2Icon />
            Profile
          </Link>
        </div>
        <div className="navbar__login">
          <Link className="navbar__link auth-link" to="/">
            <AppRegistrationIcon />
            Registration
          </Link>
          <Link className="navbar__link auth-link" to="/">
            <LoginIcon />
            Login
          </Link>
          <FlagSelect />
        </div>
      </nav>
    </header>
  );
};
