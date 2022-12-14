import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { Column } from '../Column/Column';
import './Board.scss';
import { getColumnsInBoard, getTasksInBoard } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';
import { ModalActions } from '../../types';

const Board = () => {
  const { currentBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnsInBoard(currentBoard._id));
    dispatch(getTasksInBoard(currentBoard._id));
  }, []);
  return (
    <div className="container board_container">
      <h1>{currentBoard.title}</h1>
      <Button
        value={'CREATE NEW COLUMN'}
        className={'board_btn'}
        onClick={() => {
          dispatch(storeSlice.actions.setShowModal(true));
          dispatch(storeSlice.actions.setModalActions(ModalActions.CreateColumn));
        }}
      />
      <div className="board_columns">
        {currentBoard.columns?.map((column) => {
          return <Column column={column} key={column._id} />;
        })}
      </div>
    </div>
  );
};

export default Board;
