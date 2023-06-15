import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import type { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { NotificationListResponse } from '../types';

export const getMyNotifications = (): Promise<NotificationListResponse> => {
  return axios.get(`${API_ENDPOINT}/my`);
};

type QueryFnType = typeof getMyNotifications;

type UseNotificationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useMyNotifications = ({ config }: UseNotificationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: [QUERY_KEY_PLURAL],
    queryFn: () => getMyNotifications(),
  });
};
