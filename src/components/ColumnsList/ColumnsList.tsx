import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Button } from '../UI/Button/Button';
import { Column } from '../Column/Column';
import './ColumnsList.scss';
import { getColumnsInBoard, getTasksInBoard, updColumn } from '../../store/reducers/ActionCreators';
import { storeSlice } from '../../store/reducers/StoreSlice';
import { IColumn, INewBody, ModalActions } from '../../types';
import { useTranslation } from 'react-i18next';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export const ColumnsList = () => {
  const [isInteractiveElementsDisabled, setIsInteractiveElementsDisabled] = useState(true);
  const { t } = useTranslation();
  const { currentBoard } = useAppSelector((state) => state.storeReducer);
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent) => {
    if (document.activeElement) {
      const activeElement = document.activeElement;
      const target = e.target as HTMLElement;
      if (target.tagName === 'TEXTAREA') {
        setIsInteractiveElementsDisabled(false);
        target.focus();
      } else {
        setIsInteractiveElementsDisabled(true);
        if (activeElement.tagName === 'TEXTAREA') {
          (activeElement as HTMLTextAreaElement).blur();
        }
      }
    }
  };

  const onDragStart = () => {
    (document.activeElement as HTMLElement).blur();
  };

  const onDragEnd = async (result: DropResult) => {
    if (currentBoard.columns) {
      const { source, destination, draggableId } = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index)
        return;

      if (result.type === 'COLUMN') {
        let newColumnsOrder: IColumn[] = Array.from(currentBoard.columns);
        const spliced = newColumnsOrder.splice(source.index, 1)[0];
        newColumnsOrder.splice(destination.index, 0, spliced);
        newColumnsOrder = newColumnsOrder.map((column, index: number) => ({
          ...column,
          order: index + 1,
        }));
        dispatch(storeSlice.actions.setCurrentBoardColumns(newColumnsOrder));
        dispatch(updColumn(currentBoard._id, draggableId, destination.index + 1, spliced));
        return;
      }
    }
  };

  useEffect(() => {
    dispatch(getColumnsInBoard(currentBoard._id));
    dispatch(getTasksInBoard(currentBoard._id));
  }, []);

  return (
    <div className="container board_container">
      <h1>{currentBoard.title}</h1>
      <Button
        value={`${t('buttons.btnCreateColumn')}`}
        className={'board_btn'}
        onClick={() => {
          dispatch(storeSlice.actions.setShowModal(true));
          dispatch(storeSlice.actions.setModalActions(ModalActions.CreateColumn));
        }}
      />
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <Droppable droppableId="columns" direction="horizontal" type="COLUMN">
          {(provided, snapshot) => (
            <div
              id="columns"
              className="board_columns"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {currentBoard.columns?.map((column, index) => {
                return (
                  <Draggable
                    key={column._id}
                    draggableId={column._id}
                    index={index}
                    disableInteractiveElementBlocking={isInteractiveElementsDisabled}
                  >
                    {(provided, snapshot) => {
                      return (
                        <div
                          onClick={onClick}
                          // onMouseDown={onMouseDown}
                          key={column._id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Column column={column} key={column._id} />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
