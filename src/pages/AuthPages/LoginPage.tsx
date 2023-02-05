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
import { useTranslation } from 'react-i18next';

interface IFormikErrors {
  login: string;
  password: string;
}

export const LoginPage = () => {
  const { t } = useTranslation();
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
            errors.password = `${t('authPage.errorRequired')}`;
          } else if (values.password.length < 4) {
            errors.password = `${t('authPage.errorPassword')}`;
          }
          if (!values.login) {
            errors.login = `${t('authPage.errorRequired')}`;
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)) {
            errors.login = `${t('authPage.errorEmail')}`;
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
                {t('authPage.login')}
              </h2>
              <div className="input__container">
                <label htmlFor="email">{t('authPage.email')}: </label>
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
                <label htmlFor="password">{t('authPage.password')}: </label>
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
              <Button value={`${t('authPage.login')}`} type={'submit'} disabled={isSubmitting} />
              <div>
                <Link className="navbar__link auth-link login" to="/registration">
                  <AppRegistrationIcon />
                  {t('authPage.registration')}
                </Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
