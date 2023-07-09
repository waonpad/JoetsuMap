import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import type { IdListResponse } from '@/types';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

export const getBookmarkedTravelSpotIds = (): Promise<IdListResponse> => {
  return axios.get(`${API_ENDPOINT}/bookmarks/ids`);
};

type QueryFnType = typeof getBookmarkedTravelSpotIds;

type UseBookmarkedTravelSpotIdsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useBookmarkedTravelSpotIds = ({ config }: UseBookmarkedTravelSpotIdsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, 'bookmarked', 'ids'],
    queryFn: getBookmarkedTravelSpotIds,
  });
};
