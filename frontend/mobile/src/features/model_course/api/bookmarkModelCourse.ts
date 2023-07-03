import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';
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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: bookmarkModelCourse,
  });
};
