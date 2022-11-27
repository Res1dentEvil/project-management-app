import React, { useEffect } from 'react';
import './AuthPage.scss';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getLogin } from '../../store/reducers/ActionCreators';

interface IFormikErrors {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.storeReducer);

  useEffect(() => {
    if (isAuth) {
      router('/boards');
    }
  }, [isAuth]);

  return (
    <div>
      <Formik
        initialValues={{ login: '', password: '' }}
        validate={(values) => {
          const errors = {} as IFormikErrors;
          if (!values.password) {
            errors.password = 'Required';
          } else if (values.password.length < 4) {
            errors.password = 'Password length must be more than 4';
          }
          if (!values.login) {
            errors.login = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)) {
            errors.login = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(getLogin(values));
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <div className="container auth-form__container">
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>
                <LoginIcon />
                Login
              </h2>
              <div className="input__container">
                <label htmlFor="email">Email: </label>
                <Input
                  type={'email'}
                  id={'login'}
                  name={'login'}
                  className={'input'}
                  defaultValue={values.login}
                  onChange={handleChange}
                />
                <span className={'input__error'}>
                  {errors.login && touched.login && errors.login}
                </span>
              </div>
              <div className="input__container">
                <label htmlFor="password">Password: </label>
                <Input
                  type={'password'}
                  id={'password'}
                  name={'password'}
                  className={'input'}
                  defaultValue={values.password}
                  onChange={handleChange}
                />
                <span className={'input__error'}>
                  {errors.password && touched.password && errors.password}
                </span>
              </div>
              <Button value={'Login'} type={'submit'} disabled={isSubmitting} />
              <div>
                <Link className="navbar__link auth-link login" to="/registration">
                  <AppRegistrationIcon />
                  Registration
                </Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
