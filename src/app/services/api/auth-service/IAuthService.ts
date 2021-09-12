import { ILoginPassword } from 'models/interfaces/ILoginPassword';
import { IUser } from 'models/interfaces/IUser';

export interface IAuthService {
  token: string;
  isLoggedIn: boolean;
  user: IUser;
  cid: string;

  loginWithToken(): Promise<void>;
  loginWithPassword(data: ILoginPassword): Promise<void>;
}
