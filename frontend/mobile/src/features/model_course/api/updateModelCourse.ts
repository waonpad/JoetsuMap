import { useMutation } from '@tanstack/react-query';

import type { TravelSpot } from '@/features/travel_spot';
import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { ModelCourse, ModelCourseResponse } from '../types';

export type UpdateModelCourseDTO = {
  // TODO: Fix this type
  data: {
    title: ModelCourse['title'];
    travelSpotIds: TravelSpot['id'][];
  };
  modelCourseId: ModelCourse['id'];
};

export const updateModelCourse = ({
  data,
  modelCourseId,
}: UpdateModelCourseDTO): Promise<ModelCourseResponse> => {
  return axios.patch(`${API_ENDPOINT}/${modelCourseId}`, data);
};

type UseUpdateModelCourseOptions = {
  config?: MutationConfig<typeof updateModelCourse>;
};

export const useUpdateModelCourse = ({ config }: UseUpdateModelCourseOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY]);
    },
    ...config,
    mutationFn: updateModelCourse,
  });
};
