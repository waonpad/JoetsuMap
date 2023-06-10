import { axios } from '@/lib/axios';
import type { ROLES } from '@/types';

import type { JwtResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  username: string;
  role?: ROLES['name'][];
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<JwtResponse> => {
  return axios.post('/auth/register', data);
};
