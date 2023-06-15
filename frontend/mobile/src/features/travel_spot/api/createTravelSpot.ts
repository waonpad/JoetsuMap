import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpot, TravelSpotResponse } from '../types';

export type CreateTravelSpotDTO = {
  // TODO: Fix this type
  data: Partial<TravelSpot>;
};

export const createTravelSpot = ({ data }: CreateTravelSpotDTO): Promise<TravelSpotResponse> => {
  return axios.post(API_ENDPOINT, data);
};

type UseCreateTravelSpotOptions = {
  config?: MutationConfig<typeof createTravelSpot>;
};

export const useCreateTravelSpot = ({ config }: UseCreateTravelSpotOptions = {}) => {
  return useMutation({
    onMutate: async (newTravelSpot) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousTravelSpots = queryClient.getQueryData<TravelSpot[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(QUERY_KEY_PLURAL, [
        ...(previousTravelSpots || []),
        newTravelSpot.data,
      ]);

      return { previousTravelSpots };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTravelSpots) {
        queryClient.setQueryData(QUERY_KEY_PLURAL, context.previousTravelSpots);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_PLURAL);
    },
    ...config,
    mutationFn: createTravelSpot,
  });
};
