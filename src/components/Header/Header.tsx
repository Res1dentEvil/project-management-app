import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { FlagSelect } from '../UI/FlagSelect/FlagSelect';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { getLocalStorage } from '../../services/localStorage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getLogout } from '../../store/reducers/ActionCreators';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);
  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar__logo">
          <Link className="navbar__link" to="/">
            RS Project Management App
          </Link>
        </div>
        {isAuth && (
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
        )}

        {isAuth ? (
          <div className="navbar__logout">
            <Link
              onClick={() => {
                dispatch(getLogout());
              }}
              className="navbar__link auth-link"
              to="/login"
            >
              <LogoutIcon />
              Logout
            </Link>
          </div>
        ) : (
          <div className="navbar__login">
            <Link className="navbar__link auth-link" to="/registration">
              <AppRegistrationIcon />
              Registration
            </Link>
            <Link className="navbar__link auth-link" to="/login">
              <LoginIcon />
              Login
            </Link>
            <FlagSelect />
          </div>
        )}
      </nav>
    </header>
  );
};
