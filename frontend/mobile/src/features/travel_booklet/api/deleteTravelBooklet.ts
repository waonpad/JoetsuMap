import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';
import { type TravelBooklet } from '../types';

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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: deleteTravelBooklet,
  });
};
