import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';
import { EXPECTED_EXCEPTION } from '@/types';
import { enableUseErrorBoundary } from '@/utils/compute';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBooklet, TravelBookletResponse } from '../types';

export type CreateTravelBookletDTO = {
  data: {
    title: TravelBooklet['title'];
    text: TravelBooklet['text'];
    photo: TravelBooklet['photo'];
  };
};

export const createTravelBooklet = ({
  data,
}: CreateTravelBookletDTO): Promise<TravelBookletResponse> => {
  return axios.post(API_ENDPOINT, data);
};

type UseCreateTravelBookletOptions = {
  config?: MutationConfig<typeof createTravelBooklet>;
};

// // 予期される例外(ErrorBoundaryを発火させない例外)を列挙する
// // これらの例外に対しては個別に処理を行う
// const expectedExceptionsOfcreateTravelBooklet: (keyof typeof EXPECTED_EXCEPTION)[] = [
//   EXPECTED_EXCEPTION.TEST,
//   EXPECTED_EXCEPTION.VALIDATION_ERROR,
//   // EXPECTED_EXCEPTION.TARGET_NOT_FOUND, updateなら必要
//   // EXPECTED_EXCEPTION.ACCESS_DENIED, updateなら必要
//   EXPECTED_EXCEPTION.FILE_UPLOAD_ERROR, // 画像をアップロードするので必要
// ];

export const useCreateTravelBooklet = ({ config }: UseCreateTravelBookletOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    // useErrorBoundary: (error) => {
    //   return enableUseErrorBoundary(error, expectedExceptionsOfcreateTravelBooklet);
    // },
    // onError: (error) => {
    //   const type = error.response?.data.error.type;

    //   if (type === EXPECTED_EXCEPTION.TEST) {
    //     Alert.alert('テストエラーです。');
    //   }
    // },
    ...config,
    mutationFn: createTravelBooklet,
  });
};
