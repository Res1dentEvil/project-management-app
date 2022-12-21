import React, { useEffect } from 'react';
import { BoardCard } from '../../components/BoardCard/BoardCard';
import './BoardsPage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBoards } from '../../store/reducers/ActionCreators';

const BoardsPage = () => {
  const dispatch = useAppDispatch();
  const { boards } = useAppSelector((state) => state.storeReducer);
  useEffect(() => {
    dispatch(getAllBoards());
  }, []);

  return (
    <div className="container boards__container">
      {/*<h1>BoardsPage</h1>*/}
      <div className="boards__wrapper">
        {boards.map((board) => {
          return <BoardCard board={board} key={board._id} />;
        })}
      </div>
    </div>
  );
};

export default BoardsPage;
