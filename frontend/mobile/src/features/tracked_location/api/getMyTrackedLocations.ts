import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TrackedLocationListResponse } from '../types';

export const getMyTrackedLocations = (): Promise<TrackedLocationListResponse> => {
  return axios.get(`${API_ENDPOINT}/my`);
};

type QueryFnType = typeof getMyTrackedLocations;

type UseTrackedLocationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMyTrackedLocations = ({ config }: UseTrackedLocationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getMyTrackedLocations(),
  });
};
