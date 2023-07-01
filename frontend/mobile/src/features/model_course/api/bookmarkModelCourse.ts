import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';
import type { ToggleBookmarkResponse } from '@/types';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCourse } from '../types';

export const bookmarkModelCourse = ({
  modelCourseId,
}: {
  modelCourseId: ModelCourse['id'];
}): Promise<ToggleBookmarkResponse> => {
  return axios.post(`${API_ENDPOINT}/bookmarks/${modelCourseId}`);
};

type UseBookmarkModelCourseOptions = {
  config?: MutationConfig<typeof bookmarkModelCourse>;
};

export const useBookmarkModelCourse = ({ config }: UseBookmarkModelCourseOptions = {}) => {
  return useMutation({
    onMutate: async (bookmarkdModelCourse) => {
      await queryClient.cancelQueries([QUERY_KEY_PLURAL]);

      const previousModelCourses = queryClient.getQueryData<ModelCourse[]>([QUERY_KEY_PLURAL]);

      queryClient.setQueryData(
        [QUERY_KEY_PLURAL],
        previousModelCourses?.filter(
          (modelCourse) => modelCourse.id !== bookmarkdModelCourse.modelCourseId,
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
    mutationFn: bookmarkModelCourse,
  });
};
