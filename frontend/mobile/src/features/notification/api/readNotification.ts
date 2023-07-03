import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { Notification } from '../types';

export const readNotification = ({ notificationId }: { notificationId: Notification['id'] }) => {
  return axios.patch(`${API_ENDPOINT}/read/${notificationId}`);
};

type UseDeleteNotificationOptions = {
  config?: MutationConfig<typeof readNotification>;
};

export const useReadNotification = ({ config }: UseDeleteNotificationOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: readNotification,
  });
};
