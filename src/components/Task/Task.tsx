import React from 'react';
import { ITask } from '../../types';
import './Task.scss';

export const Task = ({ title, order, description, userId, users }: ITask) => {
  return (
    <div className="column_task">
      <h3 className="column_task-title">{title}</h3>
      <div className="column_task-description">{description}</div>
    </div>
  );
};
