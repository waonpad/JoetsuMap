// 使うかわからない

import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TrackedLocation, TrackedLocationResponse } from '../types';

export type CreateTrackedLocationDTO = {
  // TODO: Fix this type
  data: Partial<TrackedLocation>;
};

export const createTrackedLocation = ({
  data,
}: CreateTrackedLocationDTO): Promise<TrackedLocationResponse> => {
  return axios.post(API_ENDPOINT, data);
};

type UseCreateTrackedLocationOptions = {
  config?: MutationConfig<typeof createTrackedLocation>;
};

export const useCreateTrackedLocation = ({ config }: UseCreateTrackedLocationOptions = {}) => {
  return useMutation({
    onMutate: async (newTrackedLocation) => {
      await queryClient.cancelQueries(QUERY_KEY_PLURAL);

      const previousTrackedLocations =
        queryClient.getQueryData<TrackedLocation[]>(QUERY_KEY_PLURAL);

      queryClient.setQueryData(QUERY_KEY_PLURAL, [
        ...(previousTrackedLocations || []),
        newTrackedLocation.data,
      ]);

      return { previousTrackedLocations };
    },
    onError: (_, __, context: any) => {
      if (context?.previousTrackedLocations) {
        queryClient.setQueryData(QUERY_KEY_PLURAL, context.previousTrackedLocations);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY_PLURAL);
    },
    ...config,
    mutationFn: createTrackedLocation,
  });
};
