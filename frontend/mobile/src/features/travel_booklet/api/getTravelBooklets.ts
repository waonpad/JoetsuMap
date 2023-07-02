import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBookletPageResponse } from '../types';

export const getTravelBooklets = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<TravelBookletPageResponse> => {
  return axios.get(`${API_ENDPOINT}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getTravelBooklets;

type UseTravelBookletsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useTravelBooklets = ({ config }: UseTravelBookletsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getTravelBooklets({ pageParam }),
    getNextPageParam: (page) => {
      return page.travelBooklets.last ? undefined : page.travelBooklets.number + 1;
    },
  });
};
