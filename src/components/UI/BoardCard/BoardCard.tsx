import React from 'react';
import './BoardCard.scss';
import CurrentImg from '../../../assets/trello1.png';
import DeleteIcon from '../../../assets/delete2.svg';
import EditIcon from '../../../assets/edit.svg';
import { useAppDispatch } from '../../../hooks/redux';
import { deleteBoard } from '../../../store/reducers/ActionCreators';
import { storeSlice } from '../../../store/reducers/StoreSlice';
import { useNavigate } from 'react-router-dom';
import { ModalActions } from '../../../types';

interface IBoardProps {
  board: { _id: string; title: string; owner: string; users: string[] };
}

export const BoardCard = ({ board }: IBoardProps) => {
  const dispatch = useAppDispatch();
  const router = useNavigate();
  return (
    <div
      className="board__card"
      onClick={() => {
        dispatch(storeSlice.actions.setCurrentBoard(board));
        router(`/boards/${board._id}`);
      }}
    >
      <div className="board__card-description">
        <h3>{board.title}</h3>
        <div className="board__card-panel">
          <img
            src={EditIcon}
            alt={board.title}
            className="board__card-icon edit"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(storeSlice.actions.setCurrentBoard(board));
              dispatch(storeSlice.actions.setModalActions(ModalActions.EditBoard));
              dispatch(storeSlice.actions.setShowModal(true));
            }}
          />
          <img
            src={DeleteIcon}
            alt={board.title}
            className="board__card-icon delete"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(deleteBoard(board._id));
            }}
          />
        </div>
      </div>
      <img src={CurrentImg} alt="" className="board__card-img" />
    </div>
  );
};
