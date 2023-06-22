import type { User } from '@/features/user';
import { axios } from '@/lib/axios';

import { API_ENDPOINT, LOGIN } from '../constants';

import type { JwtResponse } from '../types';

export type LoginCredentialsDTO = {
  username: User['username'];
  password: string;
};

export const loginFn = (data: LoginCredentialsDTO): Promise<JwtResponse> => {
  return axios.post(`${API_ENDPOINT}/${LOGIN}`, data);
};
