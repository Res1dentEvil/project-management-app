import React from 'react';
import { ITask } from '../../types';
import './Task.scss';
import { EditIcon } from '../UI/Icons/EditIcon';
import { DeleteIcon } from '../UI/Icons/DeleteIcon';

interface ITaskProps {
  taskData: ITask;
}

export const Task = ({ taskData }: ITaskProps) => {
  return (
    <div className="column_task">
      <h3 className="column_task-title">{taskData.title}</h3>
      <div className="column_task-description">{taskData.description}</div>
      <div className="icons-panel">
        <EditIcon taskData={taskData} />
        <DeleteIcon taskData={taskData} iconAction={'DELETE_TASK'} />
      </div>
    </div>
  );
};
