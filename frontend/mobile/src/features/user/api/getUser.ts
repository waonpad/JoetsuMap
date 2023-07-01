import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { User, UserResponse } from '../types';

export const getUser = ({ userId }: { userId: User['id'] }): Promise<UserResponse> => {
  return axios.get(`${API_ENDPOINT}/${userId}`);
};

type QueryFnType = typeof getUser;

type UseUserOptions = {
  userId: User['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useUser = ({ userId, config }: UseUserOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY, userId],
    queryFn: () => getUser({ userId }),
  });
};
