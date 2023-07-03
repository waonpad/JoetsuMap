import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

export const readAllNotification = () => {
  return axios.patch(`${API_ENDPOINT}/readall`);
};

type UseDeleteNotificationOptions = {
  config?: MutationConfig<typeof readAllNotification>;
};

export const useReadAllNotification = ({ config }: UseDeleteNotificationOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: readAllNotification,
  });
};
