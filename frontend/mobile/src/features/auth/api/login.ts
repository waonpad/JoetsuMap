import { useMutation } from '@tanstack/react-query';

import type { User } from '@/features/user';
import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, LOGIN } from '../constants';

import type { JwtResponse } from '../types';

export type LoginCredentialsDTO = {
  data: {
    username: User['username'];
    password: string;
  };
};

export const loginFn = ({ data }: LoginCredentialsDTO): Promise<JwtResponse> => {
  return axios.post(`${API_ENDPOINT}/${LOGIN}`, data);
};

type UseLoginOptions = {
  config?: MutationConfig<typeof loginFn>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: loginFn,
  });
};
