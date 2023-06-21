import { axios } from '@/lib/axios';
import type { LatLng } from '@/types';

import { API_ENDPOINT } from '../constants';

import type { TrackedLocationResponse } from '../types';

export type CreateTrackedLocationDTO = {
  data: {
    coords: LatLng;
  };
};

export const createTrackedLocation = async ({
  data,
}: CreateTrackedLocationDTO): Promise<TrackedLocationResponse> => {
  return axios.post(API_ENDPOINT, data);
};
