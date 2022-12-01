import { AppDispatch } from '../store';
import axios, { AxiosError } from 'axios';
import { storeSlice } from './StoreSlice';
import { IDecodedToken, ILoginBody, INewBoardBody, IRegistrationBody } from '../../types';
import { getLocalStorageToken, setLocalStorage } from '../../services/localStorage';
import { decodeToken } from 'react-jwt';
// import { apiURL } from '../../services/services';

export const getRegistration = (
  body: IRegistrationBody,
  setIsRegistrationSuccess: (arg0: boolean) => void
) => {
  return async (dispatch: AppDispatch) => {
    console.log('registration...');
    try {
      dispatch(storeSlice.actions.fetching());
      const response = await axios
        .post(`http://localhost:3000/auth/signup`, body, {
          headers: { 'Content-Type': 'application/json' },
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
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .post(`http://localhost:3000/auth/signin`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        const myDecodedToken: IDecodedToken = decodeToken(response.data.token)!;
        console.log('DECODED TOKEN: ', myDecodedToken);
        setLocalStorage(response.data.token);
        dispatch(storeSlice.actions.authFetchingSuccess(myDecodedToken));
      });
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};

export const getLogout = () => async (dispatch: AppDispatch) => {
  console.log('logout...');
  try {
    dispatch(storeSlice.actions.fetching());
    localStorage.clear();
    dispatch(storeSlice.actions.logout());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const createBoard =
  (values: INewBoardBody, currentUser: IDecodedToken) => async (dispatch: AppDispatch) => {
    console.log('creating board...');
    try {
      const token = getLocalStorageToken();
      const response = await axios
        .post(
          `http://localhost:3000/boards`,
          {
            title: values.title,
            owner: currentUser.id,
            users: [],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          console.log('RESPONSE: ', response);
        });
      dispatch(storeSlice.actions.setShowModal(false));
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const getAllBoards = () => async (dispatch: AppDispatch) => {
  console.log('getting all boards...');
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .get(`http://localhost:3000/boards`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('RESPONSE: ', response.data);
        dispatch(storeSlice.actions.setAllBoards(response.data));
      });
    dispatch(storeSlice.actions.fetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
