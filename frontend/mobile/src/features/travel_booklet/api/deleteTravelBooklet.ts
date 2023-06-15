import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelBooklet } from '../types';

export const deleteTravelBooklet = ({
  travelBookletId,
}: {
  travelBookletId: TravelBooklet['id'];
}) => {
  return axios.delete(`${API_ENDPOINT}/${travelBookletId}`);
};

type UseDeleteTravelBookletOptions = {
  config?: MutationConfig<typeof deleteTravelBooklet>;
};

export const useDeleteTravelBooklet = ({ config }: UseDeleteTravelBookletOptions = {}) => {
  return useMutation({
    onMutate: async (deletedTravelBooklet) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousTravelBooklets = queryClient.getQueryData<TravelBooklet[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(
        QUERY_KEY_PLURAL,
        previousTravelBooklets?.filter(
          (travelBooklet) => travelBooklet.id !== deletedTravelBooklet.travelBookletId,
        ),
      );

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
    mutationFn: deleteTravelBooklet,
  });
};
