import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import type { ToggleBookmarkResponse } from '@/types';

import { API_ENDPOINT } from '../constants';

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
    ...config,
    mutationFn: bookmarkTravelSpot,
  });
};
