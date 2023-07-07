import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { Notification, NotificationResponse } from '../types';

export const getNotification = ({
  notificationId,
}: {
  notificationId: Notification['id'];
}): Promise<NotificationResponse> => {
  return axios.get(`${API_ENDPOINT}/${notificationId}`);
};

type QueryFnType = typeof getNotification;

type UseNotificationOptions = {
  notificationId: Notification['id'];
  config?: QueryConfig<QueryFnType>;
};

export const useNotification = ({ notificationId, config }: UseNotificationOptions) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY, notificationId],
    queryFn: () => getNotification({ notificationId }),
  });
};
