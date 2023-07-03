import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';
import type { ToggleBookmarkResponse } from '@/types';

import { API_ENDPOINT, QUERY_KEY_PLURAL } from '../constants';

import type { TravelSpot } from '../types';

export const bookmarkTravelSpot = ({
  travelSpotId,
}: {
  travelSpotId: TravelSpot['id'];
}): Promise<ToggleBookmarkResponse> => {
  return axios.post(`${API_ENDPOINT}/bookmarks/${travelSpotId}`);
};

type UseBookmarkTravelSpotOptions = {
  config?: MutationConfig<typeof bookmarkTravelSpot>;
};

export const useBookmarkTravelSpot = ({ config }: UseBookmarkTravelSpotOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_PLURAL]);
    },
    ...config,
    mutationFn: bookmarkTravelSpot,
  });
};
