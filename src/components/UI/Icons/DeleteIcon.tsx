import React, { useState } from 'react';
import DeleteIconImg from '../../../assets/delete2.svg';
import './Icons.scss';
import { IBoard, IColumn, ITask } from '../../../types';
import { ConfirmingModal } from '../../Modals/ConfirmingModal';

interface IconProps {
  componentData: { boardData?: IBoard; taskData?: ITask; columnData?: IColumn };
  iconAction: string;
}

export const DeleteIcon = ({ componentData, iconAction }: IconProps) => {
  const [showConfirmingModal, setShowConfirmingModal] = useState(false);

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <img
        src={DeleteIconImg}
        alt={'delete_icon'}
        className="board__card-icon"
        onClick={(event) => {
          setShowConfirmingModal(true);
        }}
      />
      <ConfirmingModal
        showConfirmingModal={showConfirmingModal}
        setShowConfirmingModal={setShowConfirmingModal}
        componentData={componentData}
        iconAction={iconAction}
      />
    </div>
  );
};
