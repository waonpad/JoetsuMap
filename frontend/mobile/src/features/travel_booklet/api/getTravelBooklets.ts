import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBookletListResponse } from '../types';

export const getTravelBooklets = (): Promise<TravelBookletListResponse> => {
  return axios.get(API_ENDPOINT);
};

type QueryFnType = typeof getTravelBooklets;

type UseTravelBookletsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTravelBooklets = ({ config }: UseTravelBookletsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getTravelBooklets(),
  });
};
