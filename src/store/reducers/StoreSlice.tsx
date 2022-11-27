import React from 'react';
import { IState } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorage } from '../../services/localStorage';

const initialState: IState = {
  isAuth: getLocalStorage() ? true : false,
  userName: '',
  isLoading: false,
  error: '',
};

export const storeSlice = createSlice({
  name: 'myStore',
  initialState,
  reducers: {
    authFetching(state) {
      state.isLoading = true;
    },
    authFetchingSuccess(state) {
      state.isAuth = true;
      state.isLoading = false;
      state.error = '';
    },
    registrationFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    authFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.isLoading = false;
      state.error = '';
    },
  },
});

export default storeSlice.reducer;
