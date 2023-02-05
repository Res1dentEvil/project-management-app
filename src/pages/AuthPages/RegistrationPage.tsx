import React, { useEffect, useState } from 'react';
import './AuthPage.scss';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useNavigate } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Formik } from 'formik';
import { getRegistration } from '../../store/reducers/ActionCreators';
import { useAppDispatch } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';

interface IFormikErrors {
  name: string;
  login: string;
  password: string;
}

export const RegistrationPage = () => {
  const { t } = useTranslation();
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (isRegistrationSuccess) {
      router('/login');
    }
  }, [isRegistrationSuccess]);

  return (
    <div>
      <Formik
        initialValues={{ name: '', login: '', password: '' }}
        validate={(values) => {
          const errors = {} as IFormikErrors;
          if (!values.name) {
            errors.name = `${t('authPage.errorRequired')}`;
          } else if (values.name.length < 4) {
            errors.name = `${t('authPage.errorName')}`;
          }
          if (!values.login) {
            errors.login = `${t('authPage.errorRequired')}`;
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)) {
            errors.login = `${t('authPage.errorEmail')}`;
          }
          if (!values.password) {
            errors.password = `${t('authPage.errorRequired')}`;
          } else if (values.password.length < 4) {
            errors.password = `${t('authPage.errorPassword')}`;
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(getRegistration(values, setIsRegistrationSuccess));
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <div className="container auth-form__container">
            <form onSubmit={handleSubmit} className="auth-form">
              <h2>
                <AppRegistrationIcon />
                {t('authPage.registration')}
              </h2>
              <div className="input__container">
                <label htmlFor="login">{t('authPage.loginName')}: </label>
                <Input
                  type={'text'}
                  id={'name'}
                  name={'name'}
                  className={'input'}
                  defaultValue={values.name}
                  onChange={handleChange}
                />
                <span className={'input__error'}>{errors.name && touched.name && errors.name}</span>
              </div>
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
              <Button
                value={`${t('authPage.registration')}`}
                type={'submit'}
                disabled={isSubmitting}
              />
              <div>
                <Link className="navbar__link auth-link login" to="/login">
                  <LoginIcon />
                  {t('authPage.loginIfRegistration')}
                </Link>
              </div>
            </form>
          </div>
        )}
      </Formik>
    </div>
  );
};
