import React from 'react';
import EditIconImg from '../../../assets/edit.svg';
import './Icons.scss';
import { storeSlice } from '../../../store/reducers/StoreSlice';
import { ITask, ModalActions } from '../../../types';
import { useAppDispatch } from '../../../hooks/redux';

interface IconProps {
  taskData: ITask;
}

export const EditIcon = ({ taskData }: IconProps) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <img
        src={EditIconImg}
        alt={'edit_icon'}
        className="board__card-icon"
        onClick={(event) => {
          event.stopPropagation();
          dispatch(storeSlice.actions.setModalActions(ModalActions.EditTask));
          dispatch(storeSlice.actions.setCurrentTask(taskData));
          dispatch(storeSlice.actions.setShowModal(true));
        }}
      />
    </div>
  );
};
