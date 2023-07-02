import { useMutation } from '@tanstack/react-query';

import type { TravelSpot } from '@/features/travel_spot';
import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT } from '../constants';

import type { ModelCourse, ModelCourseResponse } from '../types';

export type CreateModelCourseDTO = {
  data: {
    title: ModelCourse['title'];
    travelSpotIds: TravelSpot['id'][];
  };
};

export const createModelCourse = ({ data }: CreateModelCourseDTO): Promise<ModelCourseResponse> => {
  return axios.post(API_ENDPOINT, data);
};

type UseCreateModelCourseOptions = {
  config?: MutationConfig<typeof createModelCourse>;
};

export const useCreateModelCourse = ({ config }: UseCreateModelCourseOptions = {}) => {
  return useMutation({
    ...config,
    mutationFn: createModelCourse,
  });
};
