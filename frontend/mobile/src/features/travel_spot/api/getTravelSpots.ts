import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpotListResponse } from '../types';

export const getTravelSpots = (): Promise<TravelSpotListResponse> => {
  return axios.get(API_ENDPOINT);
};

type QueryFnType = typeof getTravelSpots;

type UseTravelSpotsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTravelSpots = ({ config }: UseTravelSpotsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getTravelSpots(),
  });
};
