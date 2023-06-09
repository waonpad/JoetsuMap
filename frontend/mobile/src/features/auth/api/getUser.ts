import { axios } from '@/lib/axios';

import type { UserResponse } from '../types';

export const getUser = (): Promise<UserResponse> => {
  return axios.get('/auth/me');
};
