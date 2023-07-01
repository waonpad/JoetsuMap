import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpotListResponse } from '../types';

export const searchTravelSpots = ({
  params,
}: {
  params: { freeKeyword: string };
}): Promise<TravelSpotListResponse> => {
  return axios.get(`${API_ENDPOINT}/search`, {
    params,
  });
};

type QueryFnType = typeof searchTravelSpots;

type UseSearchTravelSpotsOptions = {
  params: {
    freeKeyword: string;
  };
  config?: QueryConfig<QueryFnType>;
};

export const useSearchTravelSpots = (
  { params, config }: UseSearchTravelSpotsOptions = { params: { freeKeyword: '' } },
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, JSON.stringify(params)],
    queryFn: () => searchTravelSpots({ params }),
  });
};
