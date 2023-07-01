import _ from 'lodash';
import { Platform } from 'react-native';

import {
  APP_ENV,
  API_URL_PROD,
  API_URL_DEV_IOS,
  API_URL_DEV_ANDROID,
  IS_TUNNEL,
  API_URL_DEV_TUNNEL,
} from '@/constants';
import type { JwtResponse } from '@/features/auth';
import type { PageableParams } from '@/types';

export const omitToken = (user: JwtResponse) => _.omit(user, ['token']).user;

export const API_URL =
  // prettier-ignore
  // eslint-disable-next-line prettier/prettier
  APP_ENV === 'production' ? API_URL_PROD : IS_TUNNEL === 'true' ? API_URL_DEV_TUNNEL : Platform.OS === 'ios' ? API_URL_DEV_IOS : API_URL_DEV_ANDROID;

// export const buildQueryString = (params: Record<string, string | number | boolean>) => {
//   const queryItems = Object.entries(params).map(
//     ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
//   );
//   return queryItems.join('&');
// };

const DEFAULT_PAGE_SIZE = 10;

export const pageableParams = (pageableParams: PageableParams) => {
  return {
    page: pageableParams.page,
    size: pageableParams.size || DEFAULT_PAGE_SIZE,
    // sort: pageableParams.sort,
  };
};
