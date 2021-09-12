import { IUser } from 'models/interfaces/IUser';

export interface IAuthResponce {
  token: string;
  user: IUser;
}
