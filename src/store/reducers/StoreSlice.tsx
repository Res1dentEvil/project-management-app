import React from 'react';
import { IBoard, IDecodedToken, IState } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageToken } from '../../services/localStorage';
import { decodeToken } from 'react-jwt';

const initialState: IState = {
  isAuth: getLocalStorageToken() ? true : false,
  currentUser: getLocalStorageToken()
    ? decodeToken(getLocalStorageToken())!
    : ({} as IDecodedToken),
  isLoading: false,
  error: '',
  showModal: false,
  boards: [],
  editingBoard: {} as IBoard,
};

export const storeSlice = createSlice({
  name: 'myStore',
  initialState,
  reducers: {
    fetching(state) {
      state.isLoading = true;
    },
    fetchingSuccess(state) {
      state.isLoading = false;
    },
    authFetchingSuccess(state, action: PayloadAction<IDecodedToken>) {
      state.isAuth = true;
      state.isLoading = false;
      state.error = '';
      state.currentUser = action.payload;
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
      state.currentUser = {} as IDecodedToken;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setAllBoards(state, action: PayloadAction<IBoard[]>) {
      state.boards = action.payload;
    },
    setEditingBoard(state, action: PayloadAction<IBoard>) {
      state.editingBoard = action.payload;
    },
  },
});

export default storeSlice.reducer;
