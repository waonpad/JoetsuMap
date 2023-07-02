import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { TravelBooklet, TravelBookletResponse } from '../types';

export const getTravelBooklet = ({
  travelBookletId,
}: {
  travelBookletId: TravelBooklet['id'];
}): Promise<TravelBookletResponse> => {
  return axios.get(`${API_ENDPOINT}/${travelBookletId}`);
};

type QueryFnType = typeof getTravelBooklet;

type UseTravelBookletOptions = {
  travelBookletId: TravelBooklet['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useTravelBooklet = ({ travelBookletId, config }: UseTravelBookletOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY, travelBookletId],
    queryFn: () => getTravelBooklet({ travelBookletId }),
  });
};
