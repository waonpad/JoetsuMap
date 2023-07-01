import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { ModelCourse, ModelCourseResponse } from '../types';

export const getModelCourse = ({
  modelCourseId,
}: {
  modelCourseId: ModelCourse['id'];
}): Promise<ModelCourseResponse> => {
  return axios.get(`${API_ENDPOINT}/${modelCourseId}`);
};

type QueryFnType = typeof getModelCourse;

type UseModelCourseOptions = {
  modelCourseId: ModelCourse['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useModelCourse = ({ modelCourseId, config }: UseModelCourseOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY, modelCourseId],
    queryFn: () => getModelCourse({ modelCourseId }),
  });
};
