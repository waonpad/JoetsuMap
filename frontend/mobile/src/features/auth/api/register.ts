import { axios } from '@/lib/axios';
import type { ROLES } from '@/types';

import { API_ENDPOINT, REGISTER } from '../constants';

import type { JwtResponse } from '../types';

export type RegisterCredentialsDTO = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  roles?: ROLES['name'][];
};

export const registerWithEmailAndPassword = (
  data: RegisterCredentialsDTO,
): Promise<JwtResponse> => {
  return axios.post(`${API_ENDPOINT}/${REGISTER}`, data);
};
