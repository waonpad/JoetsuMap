import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { TravelBooklet, TravelBookletResponse } from '../types';

export type UpdateTravelBookletDTO = {
  data: {
    title: TravelBooklet['title'];
    text: TravelBooklet['text'];
    photo?: TravelBooklet['photo'];
  };
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
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
    ...config,
    mutationFn: updateTravelBooklet,
  });
};
