import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import './Modals.scss';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { INewBody, ModalActions } from '../../types';
import {
  createBoard,
  createColumn,
  createTask,
  editBoard,
  editColumn,
  editTask,
} from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';

export const ModalWindow = () => {
  const { currentUser, showModal, actionWithModal, currentBoard, currentColumn, currentTask } =
    useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  let currentValue = { title: '', description: '' };
  switch (actionWithModal) {
    case ModalActions.EditBoard:
      currentValue.title = currentBoard.title;
      break;
    case ModalActions.EditColumn:
      currentValue.title = currentColumn.title;
      break;
    case ModalActions.EditTask:
      currentValue.title = currentTask.title;
      currentValue.description = currentTask.description;
      break;
    default:
      currentValue = { title: '', description: '' };
  }

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => {
          dispatch(storeSlice.actions.setShowModal(false));
          dispatch(storeSlice.actions.setModalActions(ModalActions.HideModal));
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="modal">
            <Formik
              initialValues={{
                title: currentValue.title,
                description: currentValue.description,
              }}
              validate={(values) => {
                const errors = {} as INewBody;
                if (!values.title) {
                  errors.title = 'Required';
                } else if (values.title.length < 4 || values.title.length > 15) {
                  errors.title = 'Title length must be from 4 to 15 characters';
                }
                if (actionWithModal === ModalActions.CreateTask) {
                  if (!values.description) {
                    errors.description = 'Required';
                  } else if (values.description.length < 4) {
                    errors.description = 'Description length must be more than 4';
                  }
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                switch (actionWithModal) {
                  case ModalActions.CreateBoard:
                    dispatch(createBoard(values, currentUser));
                    break;
                  case ModalActions.EditBoard:
                    dispatch(editBoard(currentBoard, values));
                    break;
                  case ModalActions.CreateColumn:
                    dispatch(createColumn(currentBoard._id, values, currentUser));
                    break;
                  case ModalActions.EditColumn:
                    dispatch(editColumn(currentBoard._id, currentColumn._id, values));
                    break;
                  case ModalActions.CreateTask:
                    dispatch(createTask(currentBoard._id, values, currentUser, currentColumn._id));
                    break;
                  case ModalActions.EditTask:
                    dispatch(editTask(currentTask, values, currentUser));
                    break;
                  default:
                    break;
                }
                dispatch(storeSlice.actions.setShowModal(false));
                dispatch(storeSlice.actions.setModalActions(ModalActions.HideModal));
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <div>
                  <form onSubmit={handleSubmit} className="modal__container">
                    <h2>
                      <DashboardCustomizeIcon />
                      Create board
                    </h2>
                    <div className="input__container">
                      <label htmlFor="title">Title: </label>
                      <Input
                        type={'text'}
                        id={'title'}
                        name={'title'}
                        className={'input'}
                        defaultValue={values.title}
                        onChange={handleChange}
                      />
                      <span className={'input__error'}>
                        {errors.title && touched.title && errors.title}
                      </span>
                    </div>
                    {actionWithModal === ModalActions.CreateTask ||
                    actionWithModal === ModalActions.EditTask ? (
                      <div className="input__container">
                        <label htmlFor="description">Description: </label>
                        <textarea
                          id={'description'}
                          name={'description'}
                          className={'input modal__input'}
                          defaultValue={values.description}
                          onChange={handleChange}
                        />
                        <span className={'input__error'}>
                          {errors.description && touched.description && errors.description}
                        </span>
                      </div>
                    ) : null}

                    <Button
                      value={'Add new board'}
                      type={'submit'}
                      disabled={isSubmitting}
                      className={'btn__modal'}
                    />
                  </form>
                </div>
              )}
            </Formik>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
