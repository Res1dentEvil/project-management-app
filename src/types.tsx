export interface IState {
  isAuth: boolean;
  currentUser: IDecodedToken;
  isLoading: boolean;
  error: string;
  showModal: boolean;
  boards: IBoard[];
  currentBoard: IBoard;
  currentColumn: IColumn;
  currentTask: ITask;
  actionWithModal: ModalActions;
}
export enum ModalActions {
  HideModal = 'HIDE_MODAL',
  CreateBoard = 'CREATE_BOARD',
  EditBoard = 'EDIT_BOARD',
  CreateColumn = 'CREATE_COLUMN',
  EditColumn = 'EDIT_COLUMN',
  CreateTask = 'CREATE_TASK',
  EditTask = 'EDIT_TASK',
}
export interface IRegistrationBody {
  name: string;
  login: string;
  password: string;
}
export interface ILoginBody {
  login: string;
  password: string;
}
export interface INewBody {
  title: string;
  description?: string;
}
export interface IDecodedToken {
  id: string;
  login: string;
  iat: number;
  exp: string;
}
export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
  columns?: IColumn[];
  tasks?: ITask[];
}
export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  tasks?: ITask[];
}
export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}
