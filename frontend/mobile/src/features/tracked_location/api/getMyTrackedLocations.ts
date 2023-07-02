import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TrackedLocationPageResponse } from '../types';

export const getMyTrackedLocations = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<TrackedLocationPageResponse> => {
  return axios.get(`${API_ENDPOINT}/my`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getMyTrackedLocations;

type UseMyTrackedLocationsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useMyTrackedLocations = ({ config }: UseMyTrackedLocationsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getMyTrackedLocations({ pageParam }),
    getNextPageParam: (page) => {
      return page.trackedLocations.last ? undefined : page.trackedLocations.number + 1;
    },
  });
};
