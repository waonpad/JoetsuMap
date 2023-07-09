import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { queryClient, type MutationConfig } from '@/lib/react-query';

import { API_ENDPOINT, QUERY_KEY } from '../constants';

import type { User, UserResponse } from '../types';

export type UpdateProfileDTO = {
  data: {
    username: User['username'];
  };
  userId: User['id'];
};

export const updateUser = ({ data, userId }: UpdateProfileDTO): Promise<UserResponse> => {
  return axios.patch(`${API_ENDPOINT}/${userId}`, data);
};

type UseUpdateUserOptions = {
  config?: MutationConfig<typeof updateUser>;
};

export const useUpdateProfile = ({ config }: UseUpdateUserOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY, 'me']);
    },
    ...config,
    mutationFn: updateUser,
  });
};
