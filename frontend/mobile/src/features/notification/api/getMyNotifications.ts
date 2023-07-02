import { useInfiniteQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, InfiniteQueryConfig } from '@/lib/react-query';
import { pageableParams } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { NotificationPageResponse } from '../types';

export const getMyNotifications = ({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<NotificationPageResponse> => {
  return axios.get(`${API_ENDPOINT}/my`, {
    params: { ...pageableParams({ page: pageParam }) },
  });
};

type QueryFnType = typeof getMyNotifications;

type UseMyNotificationsOptions = {
  config?: InfiniteQueryConfig<QueryFnType>;
};

export const useMyNotifications = ({ config }: UseMyNotificationsOptions = {}) => {
  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: ({ pageParam }) => getMyNotifications({ pageParam }),
    getNextPageParam: (page) => {
      return page.notifications.last ? undefined : page.notifications.number + 1;
    },
  });
};
