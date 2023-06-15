import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

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
    onMutate: async (readedNotification) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousNotifications = queryClient.getQueryData<Notification[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(
        QUERY_KEY_PLURAL,
        previousNotifications?.filter(
          (notification) => notification.id !== readedNotification.notificationId,
        ),
      );

      return { previousNotifications };
    },
    onError: (_, __, context: any) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(QUERY_KEY_PLURAL, context.previousNotifications);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_PLURAL);
    },
    ...config,
    mutationFn: readNotification,
  });
};
