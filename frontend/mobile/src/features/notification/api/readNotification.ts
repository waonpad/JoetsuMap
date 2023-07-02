import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT } from '../constants';

import type { Notification } from '../types';

export const readNotification = ({ notificationId }: { notificationId: Notification['id'] }) => {
  return axios.patch(`${API_ENDPOINT}/read/${notificationId}`);
};

type UseDeleteNotificationOptions = {
  config?: MutationConfig<typeof readNotification>;
};

export const useReadNotification = ({ config }: UseDeleteNotificationOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: readNotification,
  });
};
