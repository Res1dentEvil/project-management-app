export interface IState {
  isAuth: boolean;
  currentUser: IDecodedToken;
  isLoading: boolean;
  error: string;
  showModal: boolean;
  boards: IBoard[];
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
export interface INewBoardBody {
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
}
