import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourseListResponse } from '../types';

export const getModelCourses = (): Promise<ModelCourseListResponse> => {
  return axios.get(API_ENDPOINT);
};

type QueryFnType = typeof getModelCourses;

type UseModelCoursesOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useModelCourses = ({ config }: UseModelCoursesOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getModelCourses(),
  });
};
