export interface IState {
  isAuth: boolean;
  userName: string;
  isLoading: boolean;
  error: string;
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
