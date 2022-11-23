import React from 'react';
import './AuthPage.scss';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export const RegistrationPage = () => {
  return (
    <div className="container auth-form__container">
      <form className="auth-form">
        <h2>
          <AppRegistrationIcon />
          Registration
        </h2>
        <div className="input__container">
          <label htmlFor="login">Login: </label>
          <Input type={'text'} id={'login'} name={'login'} className={'input'} />
        </div>
        <div className="input__container">
          <label htmlFor="email">Email: </label>
          <Input type={'email'} id={'email'} name={'email'} className={'input'} />
        </div>
        <div className="input__container">
          <label htmlFor="password">Password: </label>
          <Input type={'password'} id={'password'} name={'password'} className={'input'} />
        </div>
        <Button value={'Registration'} />
        <div>
          <Link className="navbar__link auth-link login" to="/login">
            <LoginIcon />
            Login if you are registered
          </Link>
        </div>
      </form>
    </div>
  );
};
