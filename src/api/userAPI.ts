import { LoginProps, UserAPI, UserProps } from '@/types/types';
import { backend } from '@/api/api';

export const userAPI: UserAPI = {
  register: async (payload: LoginProps): Promise<UserProps | null> =>
    backend.post<UserProps>('Users/register', payload)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      }),
  getUser: async (): Promise<UserProps | null> => {
    return backend.get<UserProps>('Users')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  },
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
