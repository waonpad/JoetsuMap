import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpotPageResponse } from '../types';

export const searchTravelSpots = ({
  freeKeyword,
  pageParam = 0,
}: {
  freeKeyword: string;
  pageParam?: number;
}): Promise<TravelSpotPageResponse> => {
  return axios.get(`${API_ENDPOINT}/search`, {
    params: {
      freeKeyword,
      ...pageableParams({ page: pageParam }),
    },
  });
};

type QueryFnType = typeof searchTravelSpots;

export type SearchTravelSpotsDTO = {
  freeKeyword: string;
};

type UseSearchTravelSpotsOptions = {
  params: SearchTravelSpotsDTO;
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useSearchTravelSpots = (
  { params, config }: UseSearchTravelSpotsOptions = { params: { freeKeyword: '' } },
) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, params.freeKeyword],
    queryFn: ({ pageParam }) => searchTravelSpots({ ...params, pageParam }),
    getNextPageParam: (page) => {
      return page.travelSpots.last ? undefined : page.travelSpots.number + 1;
    },
  });
};
