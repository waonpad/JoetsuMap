import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { TravelSpot, TravelSpotResponse } from '../types';

export type UpdateTravelSpotDTO = {
  // TODO: Fix this type
  data: Partial<TravelSpot>;
  travelSpotId: TravelSpot['id'];
};

export const updateTravelSpot = ({
  data,
  travelSpotId,
}: UpdateTravelSpotDTO): Promise<TravelSpotResponse> => {
  return axios.patch(`${API_ENDPOINT}/${travelSpotId}`, data);
};

type UseUpdateTravelSpotOptions = {
  config?: MutationConfig<typeof updateTravelSpot>;
};

export const useUpdateTravelSpot = ({ config }: UseUpdateTravelSpotOptions = {}) => {
  return useMutation({
    onMutate: async (updatingTravelSpot: any) => {
      await queryClient.cancelQueries([QUERY_KEY, updatingTravelSpot?.travelSpotId]);

      const previousTravelSpot = queryClient.getQueryData<TravelSpot>([
        QUERY_KEY,
        updatingTravelSpot?.travelSpotId,
      ]);

      queryClient.setQueryData([QUERY_KEY, updatingTravelSpot?.travelSpotId], {
        ...previousTravelSpot,
        ...updatingTravelSpot.data,
        id: updatingTravelSpot.travelSpotId,
      });

      return { previousTravelSpot };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTravelSpot) {
        queryClient.setQueryData(
          [QUERY_KEY, context.previousTravelSpot.id],
          context.previousTravelSpot,
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY, data.travelSpot.id]);
    },
    ...config,
    mutationFn: updateTravelSpot,
  });
};
