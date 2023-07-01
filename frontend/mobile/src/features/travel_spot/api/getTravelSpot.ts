import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { TravelSpot, TravelSpotResponse } from '../types';

export const getTravelSpot = ({
  travelSpotId,
}: {
  travelSpotId: TravelSpot['id'];
}): Promise<TravelSpotResponse> => {
  return axios.get(`${API_ENDPOINT}/${travelSpotId}`);
};

type QueryFnType = typeof getTravelSpot;

type UseTravelSpotOptions = {
  travelSpotId: TravelSpot['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useTravelSpot = ({ travelSpotId, config }: UseTravelSpotOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY, travelSpotId],
    queryFn: () => getTravelSpot({ travelSpotId }),
  });
};
