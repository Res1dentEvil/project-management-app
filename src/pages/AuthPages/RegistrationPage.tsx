import React from 'react';
import './AuthPage.scss';
import { Input } from '../../components/UI/Input/Input';
import { Button } from '../../components/UI/Button/Button';
import LoginIcon from '@mui/icons-material/Login';
import { Link } from 'react-router-dom';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Formik } from 'formik';

interface IFormikErrors {
  login: string;
  email: string;
  password: string;
}

export const RegistrationPage = () => (
  <div>
    <Formik
      initialValues={{ login: '', email: '', password: '' }}
      validate={(values) => {
        const errors = {} as IFormikErrors;
        if (!values.login) {
          errors.login = 'Required';
        } else if (values.login.length < 4) {
          errors.login = 'Login length must be more than 4';
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        } else if (values.password.length < 4) {
          errors.password = 'Password length must be more than 4';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 0);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <div className="container auth-form__container">
          <form onSubmit={handleSubmit} className="auth-form">
            <h2>
              <AppRegistrationIcon />
              Registration
            </h2>
            <div className="input__container">
              <label htmlFor="login">Login: </label>
              <Input
                type={'text'}
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
              <label htmlFor="email">Email: </label>
              <Input
                type={'email'}
                id={'email'}
                name={'email'}
                className={'input'}
                defaultValue={values.email}
                onChange={handleChange}
              />
              <span className={'input__error'}>
                {errors.email && touched.email && errors.email}
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
            <Button value={'Registration'} type={'submit'} disabled={isSubmitting} />
            <div>
              <Link className="navbar__link auth-link login" to="/login">
                <LoginIcon />
                Login if you are registered
              </Link>
            </div>
          </form>
        </div>
      )}
    </Formik>
  </div>
);
