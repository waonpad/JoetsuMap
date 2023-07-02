import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCoursePageResponse } from '../types';

export const getBookmarkedModelCourses = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ModelCoursePageResponse> => {
  return axios.get(`${API_ENDPOINT}/bookmarks`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getBookmarkedModelCourses;

type UseBookmarkedModelCoursesOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useBookmarkedModelCourses = ({ config }: UseBookmarkedModelCoursesOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getBookmarkedModelCourses({ pageParam }),
    getNextPageParam: (page) => {
      return page.modelCourses.last ? undefined : page.modelCourses.number + 1;
    },
  });
};
