// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useUser } from '../../api/getUser';
import { useUpdateProfile } from '../../api/updateProfile';

import type { UpdateProfileFormInput, UpdateProfileFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ userId }: UpdateProfileFormProps) => {
  const userQuery = useUser({ userId });

  const updateProfileMutation = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormInput>({
    mode: 'onBlur',
    defaultValues: { ...userQuery.data?.user },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormInput> = (data: UpdateProfileFormInput) => {
    updateProfileMutation.mutate({ userId, data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
