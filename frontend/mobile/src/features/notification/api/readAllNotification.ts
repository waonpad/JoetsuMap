import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT } from '../constants';

export const readAllNotification = () => {
  return axios.patch(`${API_ENDPOINT}/readall`);
};

type UseDeleteNotificationOptions = {
  config?: MutationConfig<typeof readAllNotification>;
};

export const useReadAllNotification = ({ config }: UseDeleteNotificationOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: readAllNotification,
  });
};
