import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

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

export const useCreateTravelBooklet = ({ config }: UseCreateTravelBookletOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: createTravelBooklet,
  });
};
