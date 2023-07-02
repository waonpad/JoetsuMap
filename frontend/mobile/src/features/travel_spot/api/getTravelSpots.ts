import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpotPageResponse } from '../types';

export const getTravelSpots = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<TravelSpotPageResponse> => {
  return axios.get(`${API_ENDPOINT}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getTravelSpots;

type UseTravelSpotsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useTravelSpots = ({ config }: UseTravelSpotsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getTravelSpots({ pageParam }),
    getNextPageParam: (page) => {
      return page.travelSpots.last ? undefined : page.travelSpots.number + 1;
    },
  });
};
