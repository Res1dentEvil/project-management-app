import { AppDispatch } from '../store';
import axios, { AxiosError } from 'axios';
import { storeSlice } from './StoreSlice';
import {
  IBoard,
  IColumn,
  IDecodedToken,
  ILoginBody,
  INewBody,
  IRegistrationBody,
  ITask,
} from '../../types';
import { getLocalStorageToken, setLocalStorage } from '../../services/localStorage';
import { decodeToken } from 'react-jwt';

export const getRegistration = (
  body: IRegistrationBody,
  setIsRegistrationSuccess: (arg0: boolean) => void
) => {
  return async (dispatch: AppDispatch) => {
    console.log('registration...');
    try {
      dispatch(storeSlice.actions.fetching());
      const response = await axios
        .post(`http://localhost:3000/auth/signup`, body, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then((response) => {
          // console.log('RESPONSE: ', response);
        });
      setIsRegistrationSuccess(true);
      dispatch(storeSlice.actions.registrationFetchingSuccess());
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };
};

export const getLogin = (body: ILoginBody) => async (dispatch: AppDispatch) => {
  console.log('logining...');
  try {
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .post(`http://localhost:3000/auth/signin`, body, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
        console.log('RESPONSE: ', response);
        const myDecodedToken: IDecodedToken = decodeToken(response.data.token)!;
        console.log('DECODED TOKEN: ', myDecodedToken);
        setLocalStorage(response.data.token);
        dispatch(storeSlice.actions.authFetchingSuccess(myDecodedToken));
      });
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};

export const getLogout = () => async (dispatch: AppDispatch) => {
  console.log('logout...');
  try {
    dispatch(storeSlice.actions.fetching());
    localStorage.clear();
    dispatch(storeSlice.actions.logout());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const createBoard =
  (values: INewBody, currentUser: IDecodedToken) => async (dispatch: AppDispatch) => {
    console.log('creating board...');
    try {
      const token = getLocalStorageToken();
      const response = await axios
        .post(
          `http://localhost:3000/boards`,
          {
            title: values.title,
            owner: currentUser.id,
            users: [],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          // console.log('RESPONSE: ', response);
        });
      dispatch(storeSlice.actions.setShowModal(false));
      dispatch(getAllBoards());
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const getAllBoards = () => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .get(`http://localhost:3000/boards`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(storeSlice.actions.setAllBoards(response.data));
      });
    dispatch(storeSlice.actions.fetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};

export const deleteBoard = (board: IBoard) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    await axios.delete(`http://localhost:3000/boards/${board._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getAllBoards());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const editBoard = (board: IBoard, values: INewBody) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    await axios.put(
      `http://localhost:3000/boards/${board._id}`,
      {
        title: values.title,
        owner: board.owner,
        users: board.users,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(storeSlice.actions.setShowModal(false));
    dispatch(getAllBoards());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const getColumnsInBoard = (boardID: string) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    const response = await axios
      .get(`http://localhost:3000/boards/${boardID}/columns`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const ordered = response.data.sort((column1: IColumn, column2: IColumn) => {
          return column1.order! - column2.order!;
        });
        dispatch(storeSlice.actions.setCurrentBoardColumns(ordered));
        // dispatch(storeSlice.actions.setCurrentBoardColumns(response.data));
      });
    dispatch(storeSlice.actions.fetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};

export const createColumn =
  (boardID: string, values: INewBody, currentUser: IDecodedToken) =>
  async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      const response = await axios
        .post(
          `http://localhost:3000/boards/${boardID}/columns`,
          {
            title: values.title,
            order: 0,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          dispatch(storeSlice.actions.setNewColumns(response.data));
        });
      dispatch(storeSlice.actions.setShowModal(false));
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };
export const deleteColumn = (column: IColumn) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    await axios.delete(`http://localhost:3000/boards/${column.boardId}/columns/${column._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(getColumnsInBoard(column.boardId));
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const editColumn =
  (boardID: string, columnID: string, columnOrder: number, values: INewBody) =>
  async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      dispatch(storeSlice.actions.fetching());
      await axios.put(
        `http://localhost:3000/boards/${boardID}/columns/${columnID}`,
        {
          title: values.title,
          order: columnOrder,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getColumnsInBoard(boardID));
      dispatch(storeSlice.actions.setShowModal(false));
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const updColumn =
  (boardID: string, columnID: string, columnOrder: number, values: INewBody) =>
  async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      dispatch(storeSlice.actions.fetching());
      await axios.put(
        `http://localhost:3000/boards/${boardID}/columns/${columnID}`,
        {
          title: values.title,
          order: columnOrder,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const getTasksInColumn =
  (boardID: string, columnID: string) => async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      dispatch(storeSlice.actions.fetching());
      const response = await axios
        .get(`http://localhost:3000/boards/${boardID}/columns/${columnID}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          dispatch(
            storeSlice.actions.setCurrentColumnTasks({ columnID: columnID, tasks: response.data })
          );
        });
      dispatch(storeSlice.actions.fetchingSuccess());
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const getTasksInBoard = (boardID: string) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    const response = await axios
      .get(`http://localhost:3000/tasksSet/${boardID}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch(storeSlice.actions.setBoardTasks(response.data));
      });
    dispatch(storeSlice.actions.fetchingSuccess());
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};
export const createTask =
  (boardID: string, values: INewBody, currentUser: IDecodedToken, columnID: string) =>
  async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      const response = await axios
        .post(
          `http://localhost:3000/boards/${boardID}/columns/${columnID}/tasks`,
          {
            title: values.title,
            order: 0,
            description: values.description,
            userId: currentUser.id,
            users: [],
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          dispatch(storeSlice.actions.setNewTask(response.data));
        });
      dispatch(storeSlice.actions.setShowModal(false));
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };

export const deleteTask = (task: ITask) => async (dispatch: AppDispatch) => {
  try {
    const token = getLocalStorageToken();
    dispatch(storeSlice.actions.fetching());
    await axios.delete(
      `http://localhost:3000/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    dispatch(getTasksInBoard(task.boardId));
  } catch (e: unknown) {
    const error = e as AxiosError;
    dispatch(storeSlice.actions.authFetchingError(error.message));
  }
};

export const editTask =
  (task: ITask, values: INewBody, currentUser: IDecodedToken) => async (dispatch: AppDispatch) => {
    try {
      const token = getLocalStorageToken();
      dispatch(storeSlice.actions.fetching());
      await axios.put(
        `http://localhost:3000/boards/${task.boardId}/columns/${task.columnId}/tasks/${task._id}`,
        {
          title: values.title,
          order: 0,
          description: values.description,
          columnId: task.columnId,
          userId: currentUser.id,
          users: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch(getTasksInBoard(task.boardId));
      dispatch(storeSlice.actions.setShowModal(false));
    } catch (e: unknown) {
      const error = e as AxiosError;
      dispatch(storeSlice.actions.authFetchingError(error.message));
    }
  };
