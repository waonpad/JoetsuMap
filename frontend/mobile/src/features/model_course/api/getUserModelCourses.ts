import { useInfiniteQuery } from '@tanstack/react-query';

import type { User } from '@/features/user';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { ModelCoursePageResponse } from '../types';

export const getUserModelCourses = ({
  userId,
  pageParam = 0,
}: {
  userId: User['id'];
  pageParam?: number;
}): Promise<ModelCoursePageResponse> => {
  return axios.get(`${API_ENDPOINT}/users/${userId}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getUserModelCourses;

type UseUserModelCourseOptions = {
  userId: User['id'];
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useUserModelCourses = ({ userId, config }: UseUserModelCourseOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, userId],
    queryFn: ({ pageParam }) => getUserModelCourses({ userId, pageParam }),
    getNextPageParam: (page) => {
      return page.modelCourses.last ? undefined : page.modelCourses.number + 1;
    },
  });
};
