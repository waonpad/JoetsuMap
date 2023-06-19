import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourseListResponse } from '../types';

export const searchModelCourses = (): Promise<ModelCourseListResponse> => {
  return axios.get(`${API_ENDPOINT}/search`);
};

type QueryFnType = typeof searchModelCourses;

type UseModelCoursesOptions = {
  params: {
    freeKeyword: string;
  };
  config?: QueryConfig<QueryFnType>;
};

export const useSearchModelCourses = (
  { params, config }: UseModelCoursesOptions = { params: { freeKeyword: '' } },
) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, JSON.stringify(params)],
    queryFn: () => searchModelCourses(),
  });
};
