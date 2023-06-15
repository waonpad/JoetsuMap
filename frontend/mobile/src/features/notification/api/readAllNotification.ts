import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { Notification } from '../types';

export const readAllNotification = () => {
  return axios.patch(`${API_ENDPOINT}/readall`);
};

type UseDeleteNotificationOptions = {
  config?: MutationConfig<typeof readAllNotification>;
};

export const useReadAllNotification = ({ config }: UseDeleteNotificationOptions = {}) => {
  return useMutation({
    onMutate: async () => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousNotifications = queryClient.getQueryData<Notification[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(QUERY_KEY_PLURAL, []);

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
    mutationFn: readAllNotification,
  });
};
