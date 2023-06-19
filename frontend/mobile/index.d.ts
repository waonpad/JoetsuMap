declare module '@env' {
  export const RN_APP_NAME: string;
  export const RN_APP_ENV: 'development' | 'production' | 'test';
  export const RN_API_MOCK: 'true' | 'false';
  export const RN_API_URL_PROD: string;
  export const RN_API_URL_DEV_IOS: string;
  export const RN_API_URL_DEV_ANDROID: string;
  export const RN_IS_TUNNEL: 'true' | 'false';
  export const RN_LOCATION_TRACKING: 'true' | 'false';

  export const LOCAL_TUNNEL_SUBDOMAIN: string;
}
