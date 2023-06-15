import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBooklet, TravelBookletResponse } from '../types';

export type CreateTravelBookletDTO = {
  // TODO: Fix this type
  data: Partial<TravelBooklet>;
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
    onMutate: async (newTravelBooklet) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousTravelBooklets = queryClient.getQueryData<TravelBooklet[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(QUERY_KEY_PLURAL, [
        ...(previousTravelBooklets || []),
        newTravelBooklet.data,
      ]);

      return { previousTravelBooklets };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTravelBooklets) {
        queryClient.setQueryData(QUERY_KEY_PLURAL, context.previousTravelBooklets);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_PLURAL);
    },
    ...config,
    mutationFn: createTravelBooklet,
  });
};
