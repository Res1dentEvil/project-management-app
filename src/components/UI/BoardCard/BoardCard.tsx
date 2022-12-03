import React from 'react';
import './BoardCard.scss';
import CurrentImg from '../../../assets/trello1.png';
import DeleteIcon from '../../../assets/delete2.svg';
import EditIcon from '../../../assets/edit.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteBoard, getAllBoards } from '../../../store/reducers/ActionCreators';
import { storeSlice } from '../../../store/reducers/StoreSlice';

interface IBoardProps {
  board: { _id: string; title: string; owner: string; users: string[] };
}

export const BoardCard = ({ board }: IBoardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="board__card">
      <div className="board__card-description">
        <h3>{board.title}</h3>
        <div className="board__card-panel">
          <img
            src={EditIcon}
            alt={board.title}
            className="board__card-icon edit"
            onClick={() => {
              dispatch(storeSlice.actions.setEditingBoard(board));
              dispatch(storeSlice.actions.setShowModal(true));
            }}
          />
          <img
            src={DeleteIcon}
            alt={board.title}
            className="board__card-icon delete"
            onClick={() => {
              dispatch(deleteBoard(board._id));
            }}
          />
        </div>
      </div>
      <img src={CurrentImg} alt="" className="board__card-img" />
    </div>
  );
};
