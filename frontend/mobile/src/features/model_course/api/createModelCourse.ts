import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourse, ModelCourseResponse } from '../types';

export type CreateModelCourseDTO = {
  // TODO: Fix this type
  data: Partial<ModelCourse>;
};

export const createModelCourse = ({ data }: CreateModelCourseDTO): Promise<ModelCourseResponse> => {
  return axios.post(API_ENDPOINT, data);
};

type UseCreateModelCourseOptions = {
  config?: MutationConfig<typeof createModelCourse>;
};

export const useCreateModelCourse = ({ config }: UseCreateModelCourseOptions = {}) => {
  return useMutation({
    onMutate: async (newModelCourse) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousModelCourses = queryClient.getQueryData<ModelCourse[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(QUERY_KEY_PLURAL, [
        ...(previousModelCourses || []),
        newModelCourse.data,
      ]);

      return { previousModelCourses };
    },
    onError: (_, __, context: any) => {
      if (context?.previousModelCourses) {
        queryClient.setQueryData(QUERY_KEY_PLURAL, context.previousModelCourses);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_PLURAL);
    },
    ...config,
    mutationFn: createModelCourse,
  });
};
