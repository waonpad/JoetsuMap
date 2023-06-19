import {
  RN_APP_NAME,
  RN_APP_ENV,
  RN_API_MOCK,
  RN_API_URL_PROD,
  RN_API_URL_DEV_IOS,
  RN_API_URL_DEV_ANDROID,
  RN_IS_TUNNEL,
  LOCAL_TUNNEL_SUBDOMAIN,
  RN_LOCATION_TRACKING,
} from '@env';

export const APP_NAME = RN_APP_NAME;
export const APP_ENV = RN_APP_ENV;
export const API_MOCK = RN_API_MOCK;
export const API_URL_PROD = RN_API_URL_PROD;
export const API_URL_DEV_IOS = RN_API_URL_DEV_IOS;
export const API_URL_DEV_ANDROID = RN_API_URL_DEV_ANDROID;
export const IS_TUNNEL = RN_IS_TUNNEL;
export const LOCATION_TRACKING = RN_LOCATION_TRACKING;

export const API_URL_DEV_TUNNEL = `http://${LOCAL_TUNNEL_SUBDOMAIN}.loca.lt/api`;

export const JWT_SECRET = '123456' as string;

export const AUTH_TOKEN_KEY = `${APP_NAME}_token` as const;

export const BACK_LOCATION_TRACKING_TASK_NAME = `${APP_NAME}_back_location_tracking_task` as const;
export const FORE_LOCATION_TRACKING_SUBSCRIPTION_KEY =
  `${APP_NAME}_fore_location_tracking_subscription` as const;
export const BACK_LOCATION_TRACKING_SUBSCRIPTION_KEY =
  `${APP_NAME}_back_location_tracking_subscription` as const;
