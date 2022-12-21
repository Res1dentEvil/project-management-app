import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { FlagSelect } from '../UI/FlagSelect/FlagSelect';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getLogout } from '../../store/reducers/ActionCreators';
import { ModalWindow } from '../Modals/Modal';
import { storeSlice } from '../../store/reducers/StoreSlice';
import { ModalActions } from '../../types';
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const dispatch = useAppDispatch();
  const { isAuth, currentUser } = useAppSelector((state) => state.storeReducer);
  const { t } = useTranslation();

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
              {t('header.boards')}
            </Link>
            <Link
              className="navbar__link"
              to="#"
              onClick={() => {
                dispatch(storeSlice.actions.setModalActions(ModalActions.CreateBoard));
                dispatch(storeSlice.actions.setShowModal(true));
              }}
            >
              <DashboardCustomizeIcon />
              {t('header.newBoard')}
            </Link>
            <Link className="navbar__link" to="/profile">
              <Person2Icon />
              {t('header.profile')}
            </Link>
            <ModalWindow />
          </div>
        )}

        {isAuth ? (
          <div className="navbar__login navbar__is-auth">
            <div className="navbar__link navbar__current-user">{currentUser.login}</div>
            <FlagSelect />
            <Link
              onClick={() => {
                dispatch(getLogout());
              }}
              className="navbar__link auth-link"
              to="/login"
            >
              <LogoutIcon />
            </Link>
          </div>
        ) : (
          <div className="navbar__login">
            <Link className="navbar__link auth-link" to="/registration">
              <AppRegistrationIcon />
              {t('authPage.registration')}
            </Link>
            <Link className="navbar__link auth-link" to="/login">
              <LoginIcon />
              {t('authPage.login')}
            </Link>
            <FlagSelect />
          </div>
        )}
      </nav>
    </header>
  );
};
