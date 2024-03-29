import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import type { ROLES } from '@/types';

import { API_ENDPOINT, REGISTER } from '../constants';

import type { JwtResponse } from '../types';

export type RegisterCredentialsDTO = {
  data: {
    email: string;
    password: string;
    confirmPassword: string;
    username: string;
    roles?: ROLES['name'][];
    icon: string;
  };
};

export const registerFn = ({ data }: RegisterCredentialsDTO): Promise<JwtResponse> => {
  return axios.post(`${API_ENDPOINT}/${REGISTER}`, data);
};

type UseRegisterOptions = {
  config?: MutationConfig<typeof registerFn>;
};

export const useRegister = ({ config }: UseRegisterOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: registerFn,
  });
};
