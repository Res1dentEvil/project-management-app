import React from 'react';
import './Modals.scss';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import { Button } from '../UI/Button/Button';
import { useAppDispatch } from '../../hooks/redux';
import { deleteBoard, deleteColumn, deleteTask } from '../../store/reducers/ActionCreators';
import { ITask, IColumn, IBoard } from '../../types';

interface IModalProps {
  showConfirmingModal: boolean;
  setShowConfirmingModal: (isShow: boolean) => void;
  componentData: { boardData?: IBoard; taskData?: ITask; columnData?: IColumn };
  iconAction: string;
}

export const ConfirmingModal = ({
  showConfirmingModal,
  setShowConfirmingModal,
  componentData,
  iconAction,
}: IModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        open={showConfirmingModal}
        onClose={() => {
          setShowConfirmingModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="modal confirming-modal">
            <h2>Are you sure?</h2>
            <div className="modal_btns">
              <Button
                value={'YES'}
                className="btn_confirming-modal"
                onClick={() => {
                  switch (iconAction) {
                    case 'DELETE_BOARD':
                      dispatch(deleteBoard(componentData.boardData!));
                      break;
                    case 'DELETE_TASK':
                      dispatch(deleteTask(componentData.taskData!));
                      break;
                    case 'DELETE_COLUMN':
                      dispatch(deleteColumn(componentData.columnData!));
                      break;
                    default:
                      break;
                  }
                  setShowConfirmingModal(false);
                }}
              />
              <Button
                value={'NO'}
                className="btn_confirming-modal"
                onClick={() => {
                  setShowConfirmingModal(false);
                }}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
