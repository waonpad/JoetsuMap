import _ from 'lodash';
import { Platform } from 'react-native';

import {
  APP_ENV,
  API_URL_PROD,
  API_URL_DEV_IOS,
  API_URL_DEV_ANDROID,
  IS_TUNNEL,
  API_URL_DEV_TUNNEL,
  DEFAULT_PAGE_SIZE,
  IMAGE_SOURCE_BINARY,
} from '@/constants';
import type { JwtResponse } from '@/features/auth';
import type {
  EXPECTED_EXCEPTION,
  ErrorResponse,
  MutationErrorResponse,
  PageableParams,
} from '@/types';

import type { AxiosError } from 'axios';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

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

export const pageableParams = (pageableParams: PageableParams) => {
  return {
    page: pageableParams.page,
    size: pageableParams.size || DEFAULT_PAGE_SIZE,
    // sort: pageableParams.sort,
  };
};

export const imageSourceUri = (path: string) => {
  return `${API_URL}${IMAGE_SOURCE_BINARY}?image_path=${path}`;
};

export const getSizeFromFileName = (fileName: string) => {
  const size = fileName.match(/width-(\d+)-height-(\d+)/);
  if (size) {
    return {
      width: Number(size[1]),
      height: Number(size[2]),
    };
  }
  return {
    width: 0,
    height: 0,
  };
};

// 縦横比を維持したまま、wifdthかheightのどちらかを指定して、画像のサイズを変更する
export const resizeByWidth = (
  resizeWidth: number,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
) => {
  const ratio = resizeWidth / width;
  return {
    width: resizeWidth,
    height: height * ratio,
  };
};

export const resizeByHeight = (
  resizeHeight: number,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
) => {
  const ratio = resizeHeight / height;
  return {
    width: width * ratio,
    height: resizeHeight,
  };
};

export const setValidationErrors = <T extends FieldValues>({
  errors,
  setError,
}: {
  errors: { [K in keyof T]?: string } | undefined;
  setError: UseFormSetError<T>;
}) => {
  Object.entries(errors ?? {}).forEach(([key, value]) =>
    setError(key as `root.${string}` | 'root' | Path<T>, {
      type: 'manual',
      message: value,
    }),
  );
};

export const enableUseErrorBoundary = (
  error: AxiosError<ErrorResponse | MutationErrorResponse<any>>,
  expectedExceptions: (keyof typeof EXPECTED_EXCEPTION)[],
) => {
  const type = error?.response?.data?.error?.type;

  if (!type) {
    return true;
  }

  if (expectedExceptions.includes(type)) {
    return false;
  }

  return true;
};
