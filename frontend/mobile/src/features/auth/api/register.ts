import { axios } from '@/lib/axios';

import type { JwtResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  username: string;
  role: string[];
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<JwtResponse> => {
  return axios.post('/auth/register', data);
};
