import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import type { IdListResponse } from '@/types';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

export const getBookmarkedModelCourseIds = (): Promise<IdListResponse> => {
  return axios.get(`${API_ENDPOINT}/bookmarks/ids`);
};

type QueryFnType = typeof getBookmarkedModelCourseIds;

type UseBookmarkedModelCourseIdsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useBookmarkedModelCourseIds = ({
  config,
}: UseBookmarkedModelCourseIdsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, 'bookmarked', 'ids'],
    queryFn: getBookmarkedModelCourseIds,
  });
};
