import { axios } from '@/lib/axios';

import { API_ENDPOINT, LOGIN } from '../constants';

import type { JwtResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<JwtResponse> => {
  return axios.post(`${API_ENDPOINT}/${LOGIN}`, data);
};
