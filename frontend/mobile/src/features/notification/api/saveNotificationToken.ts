import { axios } from '@/lib/axios';

import { API_ENDPOINT } from '../constants';

export type SaveNotificationTokenDTO = {
  token: string;
};

export const saveNotificationToken = (data: SaveNotificationTokenDTO) => {
  return axios.post(`${API_ENDPOINT}/token`, data);
};
