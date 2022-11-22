import React from 'react';
import { IState } from '../../types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IState = {};

export const storeSlice = createSlice({
  name: 'myStore',
  initialState,
  //reducers is analog 'switch/case' in redux
  reducers: {},
});

export default storeSlice.reducer;
