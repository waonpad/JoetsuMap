import { useInfiniteQuery } from '@tanstack/react-query';

import type { User } from '@/features/user';
import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBookletPageResponse } from '../types';

export const getUserTravelBooklets = ({
  userId,
  pageParam = 0,
}: {
  userId: User['id'];
  pageParam?: number;
}): Promise<TravelBookletPageResponse> => {
  return axios.get(`${API_ENDPOINT}/users/${userId}`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getUserTravelBooklets;

type UseUserTravelBookletOptions = {
  userId: User['id'];
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useUserTravelBooklets = ({ userId, config }: UseUserTravelBookletOptions) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL, userId],
    queryFn: ({ pageParam }) => getUserTravelBooklets({ userId, pageParam }),
    getNextPageParam: (page) => {
      return page.travelBooklets.last ? undefined : page.travelBooklets.number + 1;
    },
  });
};
