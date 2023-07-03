import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourse } from '../types';

export const deleteModelCourse = ({ modelCourseId }: { modelCourseId: ModelCourse['id'] }) => {
  return axios.delete(`${API_ENDPOINT}/${modelCourseId}`);
};

type UseDeleteModelCourseOptions = {
  config?: MutationConfig<typeof deleteModelCourse>;
};

export const useDeleteModelCourse = ({ config }: UseDeleteModelCourseOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: deleteModelCourse,
  });
};
