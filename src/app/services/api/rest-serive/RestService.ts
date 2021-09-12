import axios from 'axios';
import Pubnub from 'pubnub';
import { api } from '..';
import { PubnubService } from '../pubnub-service/PubnubService';

const URL = 'http://localhost:8080/api/';

export abstract class RestService<T> extends PubnubService<T> {
  constructor() {
    super();
  }

  protected get<R>(endpoint: string): Promise<R> {
    return this.request<R>(endpoint);
  }

  protected post<R, T>(endpoint: string, data?: T): Promise<R> {
    return this.request<R, T>(endpoint, {
      method: 'post',
      body: data,
    });
  }

  protected patch<R, T>(endpoint: string, data: T): Promise<R> {
    return this.request<R, T>(endpoint, {
      method: 'patch',
      body: data,
    });
  }

  protected delete<R>(endpoint: string): Promise<R> {
    return this.request<R>(endpoint, {
      method: 'delete',
    });
  }

  private async request<R = string, T = void>(
    endpoint: string,
    config: IRequestConfig<T> = { method: 'get' },
  ): Promise<R> {
    if (!config.method) {
      config.method = 'get';
    }

    if (!config.headers?.Authorization) {
      const token = api.authService.token;

      if (token) {
        if (!config.headers) {
          config.headers = {};
        }

        config.headers.Authorization = token;
      }
    }

    const fetchInit: IFetchRequestInit = {
      method: config.method,
    };

    if (config.body) {
      fetchInit.data = config.body;
    }

    if (config.headers) {
      fetchInit.headers = { ...config.headers, ...fetchInit.headers };
    }

    const response = await axios(`${URL}${endpoint}`, fetchInit);

    return response.data as R;
  }
}

export interface IRequestConfig<T> {
  method?: 'get' | 'post' | 'patch' | 'delete';
  body?: T;
  headers?: Record<string, string>;
}

export interface IFetchRequestInit {
  method?: 'get' | 'post' | 'patch' | 'delete';
  data?: any;
  headers?: Record<string, string>;
}
