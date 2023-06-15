import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { PassingListResponse } from '../types';

export const getMyPassings = (): Promise<PassingListResponse> => {
  return axios.get(`${API_ENDPOINT}/my`);
};

type QueryFnType = typeof getMyPassings;

type UsePassingsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMyPassings = ({ config }: UsePassingsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getMyPassings(),
  });
};
