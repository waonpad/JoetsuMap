import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBookletListResponse } from '../types';

export const searchTravelBooklets = (): Promise<TravelBookletListResponse> => {
  return axios.get(API_ENDPOINT);
};

type QueryFnType = typeof searchTravelBooklets;

type UseTravelBookletsOptions = {
  params: {
    freeKeyword: string;
  };
  config?: QueryConfig<QueryFnType>;
};

export const useSearchTravelBooklets = (
  { params, config }: UseTravelBookletsOptions = { params: { freeKeyword: '' } },
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, JSON.stringify(params)],
    queryFn: () => searchTravelBooklets(),
  });
};
