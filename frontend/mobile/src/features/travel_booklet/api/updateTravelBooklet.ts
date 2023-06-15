import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { TravelBooklet, TravelBookletResponse } from '../types';

export type UpdateTravelBookletDTO = {
  // TODO: Fix this type
  data: Partial<TravelBooklet>;
  travelBookletId: TravelBooklet['id'];
};

export const updateTravelBooklet = ({
  data,
  travelBookletId,
}: UpdateTravelBookletDTO): Promise<TravelBookletResponse> => {
  return axios.patch(`${API_ENDPOINT}/${travelBookletId}`, data);
};

type UseUpdateTravelBookletOptions = {
  config?: MutationConfig<typeof updateTravelBooklet>;
};

export const useUpdateTravelBooklet = ({ config }: UseUpdateTravelBookletOptions = {}) => {
  return useMutation({
    onMutate: async (updatingTravelBooklet: any) => {
      await queryClient.cancelQueries([QUERY_KEY, updatingTravelBooklet?.travelBookletId]);

      const previousTravelBooklet = queryClient.getQueryData<TravelBooklet>([
        QUERY_KEY,
        updatingTravelBooklet?.travelBookletId,
      ]);

      queryClient.setQueryData([QUERY_KEY, updatingTravelBooklet?.travelBookletId], {
        ...previousTravelBooklet,
        ...updatingTravelBooklet.data,
        id: updatingTravelBooklet.travelBookletId,
      });

      return { previousTravelBooklet };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTravelBooklet) {
        queryClient.setQueryData(
          [QUERY_KEY, context.previousTravelBooklet.id],
          context.previousTravelBooklet,
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY, data.travelBooklet.id]);
    },
    ...config,
    mutationFn: updateTravelBooklet,
  });
};
