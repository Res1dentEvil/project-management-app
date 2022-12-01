import React from 'react';
import './BoardCard.scss';
import CurrentImg from '../../../assets/trello1.png';
import DeleteIcon from '../../../assets/delete2.svg';
import EditIcon from '../../../assets/edit.svg';

interface IBoardProps {
  board: { _id: string; title: string; owner: string; users: string[] };
}

export const BoardCard = ({ board }: IBoardProps) => {
  return (
    <div className="board__card">
      <div className="board__card-description">
        <h3>{board.title}</h3>
        <div className="board__card-panel">
          <img src={EditIcon} alt="" className="board__card-icon edit" />
          <img src={DeleteIcon} alt="" className="board__card-icon delete" />
        </div>
      </div>
      <img src={CurrentImg} alt="" className="board__card-img" />
    </div>
  );
};
