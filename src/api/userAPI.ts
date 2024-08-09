import { LoginProps, UserProps } from '@/types/types';
import { backend } from '@/api/api';
import { AxiosResponse } from 'axios';

export type ReturnType<T> = Promise<AxiosResponse<T, any> | null>

export const userAPI = {
  register: async (payload: LoginProps): Promise<UserProps | null> =>
    backend.post<UserProps>('Users/register', payload)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      }),
  login: async (payload: LoginProps): Promise<UserProps | null> =>
    backend.post<UserProps>('Users/login', payload)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      }),
  logout: async (): Promise<number | null> => backend.post<number>('Users/logout')
    .then((response) => response.status)
    .catch((error) => {
      console.error(error);
      return null;
    }),
  checkAuthentication: async (): Promise<boolean> => {
    try {
      const response = await backend.get<{ authenticated: boolean }>('Users/authcheck');

      return response.data.authenticated;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },
}
