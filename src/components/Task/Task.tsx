import React from 'react';
import { IColumn, ITask } from '../../types';
import './Task.scss';
import { EditIcon } from '../UI/Icons/EditIcon';
import { DeleteIcon } from '../UI/Icons/DeleteIcon';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface ITaskProps {
  taskData: ITask;
  columnData: IColumn;
}

export const Task = ({ taskData, columnData }: ITaskProps) => {
  const { currentBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  return (
    <div className="column_task">
      <h3 className="column_task-title">{taskData.title}</h3>
      <div className="column_task-description">{taskData.description}</div>
      <div className="icons-panel">
        <EditIcon taskData={taskData} />
        <DeleteIcon componentData={{ taskData: taskData }} iconAction={'DELETE_TASK'} />
      </div>
    </div>
  );
};
