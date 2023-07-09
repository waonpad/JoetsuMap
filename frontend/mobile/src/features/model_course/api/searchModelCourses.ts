import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCoursePageResponse } from '../types';

export const searchModelCourses = ({
  freeKeyword,
  pageParam = 0,
}: {
  freeKeyword: string;
  pageParam?: number;
}): Promise<ModelCoursePageResponse> => {
  return axios.get(`${API_ENDPOINT}/search`, {
    params: {
      freeKeyword,
      ...pageableParams({ page: pageParam }),
    },
  });
};

type QueryFnType = typeof searchModelCourses;

type UseSearchModelCoursesOptions = {
  params: {
    freeKeyword: string;
  };
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useSearchModelCourses = (
  { params, config }: UseSearchModelCoursesOptions = { params: { freeKeyword: '' } },
) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, 'searched', params.freeKeyword],
    queryFn: ({ pageParam }) => searchModelCourses({ ...params, pageParam }),
    getNextPageParam: (page) => {
      return page.modelCourses.last ? undefined : page.modelCourses.number + 1;
    },
  });
};
