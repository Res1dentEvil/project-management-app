import React from 'react';
import DeleteIconImg from '../../../assets/delete2.svg';
import './Icons.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { deleteTask } from '../../../store/reducers/ActionCreators';
import { ITask } from '../../../types';

interface IconProps {
  taskData: ITask;
  iconAction: string;
}

export const DeleteIcon = ({ taskData, iconAction }: IconProps) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <img
        src={DeleteIconImg}
        alt={'edit_icon'}
        className="board__card-icon"
        onClick={(event) => {
          event.stopPropagation();
          switch (iconAction) {
            case 'DELETE_TASK':
              dispatch(deleteTask(taskData));
              break;
            default:
              break;
          }
        }}
      />
    </div>
  );
};
