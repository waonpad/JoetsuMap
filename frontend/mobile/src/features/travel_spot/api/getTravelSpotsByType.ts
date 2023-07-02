import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpot, TravelSpotPageResponse } from '../types';

export const getTravelSpotsByType = ({
  travelSpotType,
  pageParam = 0,
}: {
  travelSpotType: TravelSpot['types'][number];
  pageParam?: number;
}): Promise<TravelSpotPageResponse> => {
  return axios.get(`${API_ENDPOINT}/types/${travelSpotType}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getTravelSpotsByType;

type UseTravelSpotsByTypeOptions = {
  travelSpotType: TravelSpot['types'][number];
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useTravelSpotsByType = ({ travelSpotType, config }: UseTravelSpotsByTypeOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, travelSpotType],
    queryFn: ({ pageParam }) => getTravelSpotsByType({ travelSpotType, pageParam }),
    getNextPageParam: (page) => {
      return page.travelSpots.last ? undefined : page.travelSpots.number + 1;
    },
  });
};
