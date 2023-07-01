import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourseListResponse } from '../types';

export const searchModelCourses = ({
  params,
}: {
  params: { freeKeyword: string };
}): Promise<ModelCourseListResponse> => {
  return axios.get(`${API_ENDPOINT}/search`, {
    params,
  });
};

type QueryFnType = typeof searchModelCourses;

type UseSearchModelCoursesOptions = {
  params: {
    freeKeyword: string;
  };
  config?: QueryConfig<QueryFnType>;
};

export const useSearchModelCourses = (
  { params, config }: UseSearchModelCoursesOptions = { params: { freeKeyword: '' } },
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, JSON.stringify(params)],
    queryFn: () => searchModelCourses({ params }),
  });
};
