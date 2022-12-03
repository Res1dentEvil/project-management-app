import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Modal } from '@mui/material';
import './Modal.scss';
import { Input } from '../UI/Input/Input';
import { Button } from '../UI/Button/Button';
import { Formik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import { IBoard, INewBoardBody } from '../../types';
import { createBoard, editBoard, getAllBoards } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';

export const ModalWindow = () => {
  const { currentUser, showModal, editingBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => {
          dispatch(storeSlice.actions.setShowModal(false));
          dispatch(storeSlice.actions.setEditingBoard({} as IBoard));
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="modal">
            <Formik
              initialValues={{ title: editingBoard.title ? editingBoard.title : '' }}
              validate={(values) => {
                const errors = {} as INewBoardBody;
                if (!values.title) {
                  errors.title = 'Required';
                } else if (values.title.length < 4) {
                  errors.title = 'Title length must be more than 4';
                }
                // if (!values.description) {
                //   errors.description = 'Required';
                // } else if (values.description.length < 4) {
                //   errors.description = 'Description length must be more than 4';
                // }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                editingBoard.title
                  ? dispatch(editBoard(editingBoard, values))
                  : dispatch(createBoard(values, currentUser));
                setSubmitting(false);
                dispatch(storeSlice.actions.setEditingBoard({} as IBoard));
                dispatch(getAllBoards());
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
                    {/*<div className="input__container">*/}
                    {/*  <label htmlFor="description">Description: </label>*/}
                    {/*  <textarea*/}
                    {/*    id={'description'}*/}
                    {/*    name={'description'}*/}
                    {/*    className={'input modal__input'}*/}
                    {/*    defaultValue={values.description}*/}
                    {/*    onChange={handleChange}*/}
                    {/*  />*/}
                    {/*  <span className={'input__error'}>*/}
                    {/*    {errors.description && touched.description && errors.description}*/}
                    {/*  </span>*/}
                    {/*</div>*/}
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
