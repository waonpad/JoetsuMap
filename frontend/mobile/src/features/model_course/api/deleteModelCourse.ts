import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

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
    onMutate: async (deletedModelCourse) => {
      await queryClient.cancelQueries([QUERY_KEY_PLURAL]);

      const previousModelCourses = queryClient.getQueryData<ModelCourse[]>([QUERY_KEY_PLURAL]);

      queryClient.setQueryData(
        [QUERY_KEY_PLURAL],
        previousModelCourses?.filter(
          (modelCourse) => modelCourse.id !== deletedModelCourse.modelCourseId,
        ),
      );

      return { previousModelCourses };
    },
    onError: (_, __, context: any) => {
      if (context?.previousModelCourses) {
        queryClient.setQueryData([QUERY_KEY_PLURAL], context.previousModelCourses);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: deleteModelCourse,
  });
};
