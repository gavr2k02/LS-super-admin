import { IUser } from 'models/interfaces/IUser';
import { ILoginPassword } from 'models/interfaces/ILoginPassword';
import { RestService } from '../rest-serive/RestService';
import { IAuthService } from './IAuthService';
import { IAuthResponce } from '../../../common/interfaces/auth/IAuthResponce';

export class AuthService extends RestService<IUser> implements IAuthService {
  private _user: IUser;

  constructor() {
    super();
  }

  public async loginWithToken(): Promise<void> {
    const result: IAuthResponce = await this.post('auth/login/token');
    this._user = result.user;
  }

  public async loginWithPassword(data: ILoginPassword): Promise<void> {
    const result: IAuthResponce = await this.post('auth/login/password/super-admin', data);
    this.saveToken(result.token);
    this._user = result.user;
  }

  public subscribe(channel: string): void {}

  public unsubscribe(channel: string): void {}

  private saveToken(token: string): void {
    localStorage.setItem('token-learning-service', token);
  }

  public get token(): string {
    return localStorage.getItem('token-learning-service');
  }

  public get isLoggedIn(): boolean {
    return !!this._user?.id;
  }

  public get user(): IUser {
    return this._user;
  }

  public get cid(): string {
    return this._user.cid;
  }
}
