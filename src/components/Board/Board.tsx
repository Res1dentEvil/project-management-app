import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { Column } from '../Column/Column';
import './Board.scss';
import { getColumnsInBoard } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';
import { ModalActions } from '../../types';

const Board = () => {
  const { currentBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getColumnsInBoard(currentBoard._id));
  }, []);
  return (
    <div className="container board_container">
      <h1>{currentBoard.title}</h1>
      <Button
        value={'CREATE NEW COLUMN'}
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
