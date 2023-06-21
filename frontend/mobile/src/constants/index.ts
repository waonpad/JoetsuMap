import Constants from 'expo-constants';

type Env = {
  RN_APP_NAME: string;
  RN_APP_ENV: 'development' | 'production' | 'test';
  RN_API_MOCK: 'true' | 'false';
  RN_API_URL_PROD: string;
  RN_API_URL_DEV_IOS: string;
  RN_API_URL_DEV_ANDROID: string;
  RN_IS_TUNNEL: 'true' | 'false';
  RN_LOCATION_TRACKING: 'true' | 'false';
  LOCAL_TUNNEL_SUBDOMAIN: string;
};

const env: Env = Constants.expoConfig?.extra as any;

export const APP_NAME = env.RN_APP_NAME;
export const APP_ENV = env.RN_APP_ENV;
export const API_MOCK = env.RN_API_MOCK;
export const API_URL_PROD = env.RN_API_URL_PROD;
export const API_URL_DEV_IOS = env.RN_API_URL_DEV_IOS;
export const API_URL_DEV_ANDROID = env.RN_API_URL_DEV_ANDROID;
export const IS_TUNNEL = env.RN_IS_TUNNEL;
export const LOCATION_TRACKING = env.RN_LOCATION_TRACKING;

export const API_URL_DEV_TUNNEL = `http://${env.LOCAL_TUNNEL_SUBDOMAIN}.loca.lt/api`;

export const JWT_SECRET = '123456' as string;

export const AUTH_TOKEN_KEY = `${APP_NAME}_token` as const;

export const BACK_LOCATION_TRACKING_TASK_NAME = `${APP_NAME}_back_location_tracking_task` as const;
export const FORE_LOCATION_TRACKING_SUBSCRIPTION_KEY =
  `${APP_NAME}_fore_location_tracking_subscription` as const;
export const BACK_LOCATION_TRACKING_SUBSCRIPTION_KEY =
  `${APP_NAME}_back_location_tracking_subscription` as const;
