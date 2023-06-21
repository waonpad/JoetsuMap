import { axios } from '@/lib/axios';

import { API_ENDPOINT } from '../constants';

export type SendNotificationDTO = {
  token: string;
};

/**
 * テスト用、おそらく実際には使わない
 */
export const sendNotification = (data: SendNotificationDTO) => {
  return axios.post(`${API_ENDPOINT}/send`, data);
};
