import { axios } from '@/lib/axios';

import type { UserResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  username: string;
  role: string[];
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<UserResponse> => {
  return axios.post('/auth/register', data);
};
