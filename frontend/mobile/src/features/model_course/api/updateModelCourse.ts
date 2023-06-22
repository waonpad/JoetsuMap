import { useMutation } from 'react-query';

import type { TravelSpot } from '@/features/travel_spot';
import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

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
    onMutate: async (updatingModelCourse: any) => {
      await queryClient.cancelQueries([QUERY_KEY, updatingModelCourse?.modelCourseId]);

      const previousModelCourse = queryClient.getQueryData<ModelCourse>([
        QUERY_KEY,
        updatingModelCourse?.modelCourseId,
      ]);

      queryClient.setQueryData([QUERY_KEY, updatingModelCourse?.modelCourseId], {
        ...previousModelCourse,
        ...updatingModelCourse.data,
        id: updatingModelCourse.modelCourseId,
      });

      return { previousModelCourse };
    },
    onError: (_, __, context: any) => {
      if (context?.previousModelCourse) {
        queryClient.setQueryData(
          [QUERY_KEY, context.previousModelCourse.id],
          context.previousModelCourse,
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY, data.modelCourse.id]);
    },
    ...config,
    mutationFn: updateModelCourse,
  });
};
