import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT } from '../constants';

import type { ModelCourse } from '../types';

export const deleteModelCourse = ({ modelCourseId }: { modelCourseId: ModelCourse['id'] }) => {
  return axios.delete(`${API_ENDPOINT}/${modelCourseId}`);
};

type UseDeleteModelCourseOptions = {
  config?: MutationConfig<typeof deleteModelCourse>;
};

export const useDeleteModelCourse = ({ config }: UseDeleteModelCourseOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: deleteModelCourse,
  });
};
