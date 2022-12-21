import React from 'react';
import { IBoard, IColumn, IDecodedToken, IState, ITask, ModalActions } from '../../types';
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
  showConfirmingModal: false,
  boards: [],
  currentBoard: {} as IBoard,
  currentColumn: {} as IColumn,
  currentTask: {} as ITask,
  actionWithModal: ModalActions.HideModal,
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
    setModalActions(state, action: PayloadAction<ModalActions>) {
      state.actionWithModal = action.payload;
    },
    setShowModal(state, action: PayloadAction<boolean>) {
      state.showModal = action.payload;
    },
    setAllBoards(state, action: PayloadAction<IBoard[]>) {
      state.boards = action.payload;
    },
    setCurrentBoard(state, action: PayloadAction<IBoard>) {
      state.currentBoard = action.payload;
    },
    setCurrentBoardColumns(state, action: PayloadAction<IColumn[]>) {
      state.currentBoard.columns = action.payload;
    },
    setNewColumns(state, action: PayloadAction<IColumn>) {
      state.currentBoard.columns?.push(action.payload);
    },
    setCurrentColumn(state, action: PayloadAction<IColumn>) {
      state.currentColumn = action.payload;
    },
    setCurrentColumnTasks(state, action: PayloadAction<{ columnID: string; tasks: ITask[] }>) {
      state.currentBoard.columns?.forEach((column) => {
        if (column._id === action.payload.columnID) {
          column.tasks = action.payload.tasks;
        }
      });
    },
    setBoardTasks(state, action: PayloadAction<ITask[]>) {
      state.currentBoard.tasks = action.payload;
    },
    setNewTask(state, action: PayloadAction<ITask>) {
      state.currentBoard.tasks?.push(action.payload);
    },
    setCurrentTask(state, action: PayloadAction<ITask>) {
      state.currentTask = action.payload;
    },
  },
});

export default storeSlice.reducer;
