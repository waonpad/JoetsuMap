import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpot } from '../types';

export const deleteTravelSpot = ({ travelSpotId }: { travelSpotId: TravelSpot['id'] }) => {
  return axios.delete(`${API_ENDPOINT}/${travelSpotId}`);
};

type UseDeleteTravelSpotOptions = {
  config?: MutationConfig<typeof deleteTravelSpot>;
};

export const useDeleteTravelSpot = ({ config }: UseDeleteTravelSpotOptions = {}) => {
  return useMutation({
    onMutate: async (deletedTravelSpot) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousTravelSpots = queryClient.getQueryData<TravelSpot[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(
        QUERY_KEY_PLURAL,
        previousTravelSpots?.filter(
          (travelSpot) => travelSpot.id !== deletedTravelSpot.travelSpotId,
        ),
      );

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
    mutationFn: deleteTravelSpot,
  });
};
