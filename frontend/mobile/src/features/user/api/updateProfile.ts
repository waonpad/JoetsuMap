import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import type { MutationConfig } from '@/lib/react-query';
import { queryClient } from '@/lib/react-query';

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
    onMutate: async (updatingUser: any) => {
      await queryClient.cancelQueries([QUERY_KEY, updatingUser?.userId]);

      const previousUser = queryClient.getQueryData<User>([QUERY_KEY, updatingUser?.userId]);

      queryClient.setQueryData([QUERY_KEY, updatingUser?.userId], {
        ...previousUser,
        ...updatingUser.data,
        id: updatingUser.userId,
      });

      return { previousUser };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUser) {
        queryClient.setQueryData([QUERY_KEY, context.previousUser.id], context.previousUser);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries([QUERY_KEY, data?.user.id]);
    },
    ...config,
    mutationFn: updateUser,
  });
};
