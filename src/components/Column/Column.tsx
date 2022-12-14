import React, { useEffect } from 'react';
import './Column.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ITask, ModalActions } from '../../types';
import { deleteColumn, getTasksInColumn } from '../../store/reducers/ActionCreators';
import { Task } from '../Task/Task';
import DeleteIcon from '../../assets/delete2.svg';
import EditIcon from '../../assets/edit.svg';
import AddIcon from '../../assets/addnew.png';
import { storeSlice } from '../../store/reducers/StoreSlice';

interface IColumnProps {
  column: { _id: string; title: string; order: number; boardId: string; tasks?: ITask[] };
}

export const Column = ({ column }: IColumnProps) => {
  const { currentBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTasksInColumn(currentBoard._id, column._id));
    console.log('GET TASK IN COLUMN');
  }, []);
  return (
    <div className="board_column">
      <div className="column-edit-panel">
        <h2>{column.title}</h2>
        <img
          src={EditIcon}
          alt={currentBoard.title}
          className="board__card-icon"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(storeSlice.actions.setShowModal(true));
            dispatch(storeSlice.actions.setModalActions(ModalActions.EditColumn));
            dispatch(storeSlice.actions.setCurrentColumn(column));
          }}
        />
        <img
          src={DeleteIcon}
          alt={currentBoard.title}
          className="board__card-icon"
          onClick={(event) => {
            event.stopPropagation();
            dispatch(deleteColumn(currentBoard, column._id));
          }}
        />
      </div>
      <img
        src={AddIcon}
        width={35}
        alt={currentBoard.title}
        className="board__card-icon add-task"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(storeSlice.actions.setModalActions(ModalActions.CreateTask));
          dispatch(storeSlice.actions.setShowModal(true));
          dispatch(storeSlice.actions.setCurrentColumn(column));
        }}
      />
      {/*<div className="board_column_tasks">*/}
      {/*  {column.tasks?.map((task) => {*/}
      {/*    return (*/}
      {/*      <Task*/}
      {/*        key={task._id}*/}
      {/*        title={task.title}*/}
      {/*        order={task.order}*/}
      {/*        description={task.description}*/}
      {/*        userId={task.userId}*/}
      {/*        users={task.users}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      <div className="board_column_tasks">
        {currentBoard.tasks?.map((task) => {
          return (
            task.columnId === column._id && (
              <Task
                key={task._id}
                taskData={task}
                // title={task.title}
                // order={task.order}
                // description={task.description}
                // userId={task.userId}
                // users={task.users}
              />
            )
          );
        })}
      </div>
    </div>
  );
};
