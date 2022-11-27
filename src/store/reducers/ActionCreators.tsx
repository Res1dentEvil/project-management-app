import { AppDispatch } from '../store';
import axios, { AxiosError } from 'axios';
import { storeSlice } from './StoreSlice';
import { ILoginBody, IRegistrationBody } from '../../types';
import { setLocalStorage } from '../../services/localStorage';

// import { apiURL } from '../../services/services';

const headers = {
  'Content-Type': 'application/json',
  // Authorization: `Bearer ${token}`,
};

export const getRegistration = (
  body: IRegistrationBody,
  setIsRegistrationSuccess: (arg0: boolean) => void
) => {
  return async (dispatch: AppDispatch) => {
    console.log('registration...');
    try {
      dispatch(storeSlice.actions.authFetching());
      const response = await axios
        .post(`http://localhost:3000/auth/signup`, body, {
          headers: headers,
        })
        .then((response) => {
          console.log('RESPONSE: ', response);
        });
      setIsRegistrationSuccess(true);
      dispatch(storeSlice.actions.registrationFetchingSuccess());
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };
};

export const getLogin = (body: ILoginBody) => async (dispatch: AppDispatch) => {
  console.log('logining...');
  try {
    dispatch(storeSlice.actions.authFetching());
    const response = await axios
      .post(`http://localhost:3000/auth/signin`, body, {
        headers: headers,
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        setLocalStorage(response.data.token);
      });
    dispatch(storeSlice.actions.authFetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const getLogout = () => async (dispatch: AppDispatch) => {
  console.log('logout...');
  try {
    dispatch(storeSlice.actions.authFetching());
    localStorage.clear();
    dispatch(storeSlice.actions.logout());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
