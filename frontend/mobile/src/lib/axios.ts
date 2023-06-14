import Axios from 'axios';

// import { useNotificationStore } from '@/stores/notifications';
import { API_URL } from '@/utils/compute';
import storage from '@/utils/storage';

import type { InternalAxiosRequestConfig } from 'axios';
// AxiosRequestConfig → InternalAxiosRequestConfig

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = await storage.getToken();
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
// 全てのリクエストをログに出力する
axios.interceptors.request.use((config) => {
  console.log('Request:', config);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    // 全てのレスポンスをログに出力する
    console.log('Response:', response);
    return response.data;
  },
  (error) => {
    // const message = error.response?.data?.message || error.message;
    // useNotificationStore.getState().addNotification({
    //   type: 'error',
    //   title: 'Error',
    //   message,
    // });

    // 膨大な量のレスポンスがログに出力される
    // console.log('Error:', JSON.stringify(error, null, 2));
    // console.log('Error:', JSON.stringify(error.response, null, 2));

    console.log(
      'Error:',
      error.response.data.message || error.message || 'Not Exist Error Message',
    );

    return Promise.reject(error);
  },
);
