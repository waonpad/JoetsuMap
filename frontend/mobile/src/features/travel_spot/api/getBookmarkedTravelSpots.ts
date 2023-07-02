import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpotPageResponse } from '../types';

export const getBookmarkedTravelSpots = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<TravelSpotPageResponse> => {
  return axios.get(`${API_ENDPOINT}/bookmarks`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getBookmarkedTravelSpots;

type UseBookmarkedTravelSpotsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useBookmarkedTravelSpots = ({ config }: UseBookmarkedTravelSpotsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getBookmarkedTravelSpots({ pageParam }),
    getNextPageParam: (page) => {
      return page.travelSpots.last ? undefined : page.travelSpots.number + 1;
    },
  });
};
