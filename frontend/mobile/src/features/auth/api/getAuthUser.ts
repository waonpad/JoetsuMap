import { axios } from '@/lib/axios';

import { API_ENDPOINT, AUTH_ME } from '../constants';

import type { AuthUserResponse } from '../types';

export const getAuthUser = (): Promise<AuthUserResponse> => {
  return axios.get(`${API_ENDPOINT}/${AUTH_ME}`);
};
