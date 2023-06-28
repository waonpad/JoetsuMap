import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpot, TravelSpotListResponse } from '../types';

export const getTravelSpotsByType = ({
  travelSpotType,
}: {
  travelSpotType: TravelSpot['types'][number];
}): Promise<TravelSpotListResponse> => {
  return axios.get(`${API_ENDPOINT}/types/${travelSpotType}`);
};

type QueryFnType = typeof getTravelSpotsByType;

type UseTravelSpotsByTypeOptions = {
  travelSpotType: TravelSpot['types'][number];
  config?: QueryConfig<QueryFnType>;
};

export const useTravelSpotsByType = ({ travelSpotType, config }: UseTravelSpotsByTypeOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, travelSpotType],
    queryFn: () => getTravelSpotsByType({ travelSpotType }),
  });
};
