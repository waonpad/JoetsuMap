import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCoursePageResponse } from '../types';

export const getModelCourses = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ModelCoursePageResponse> => {
  return axios.get(`${API_ENDPOINT}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getModelCourses;

type UseModelCoursesOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useModelCourses = ({ config }: UseModelCoursesOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getModelCourses({ pageParam }),
    getNextPageParam: (page) => {
      return page.modelCourses.last ? undefined : page.modelCourses.number + 1;
    },
  });
};
