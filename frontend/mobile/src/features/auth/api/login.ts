import { axios } from '@/lib/axios';

import type { JwtResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<JwtResponse> => {
  return axios.post('/auth/login', data);
};
