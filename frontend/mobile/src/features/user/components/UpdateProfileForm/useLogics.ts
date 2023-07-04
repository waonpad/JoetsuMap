// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { setValidationErrors } from '@/utils/compute';

import { useUser } from '../../api/getUser';
import { useUpdateProfile } from '../../api/updateProfile';

import type { UpdateProfileFormInput, UpdateProfileFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

export const useLogics = ({ userId }: UpdateProfileFormProps) => {
  const userQuery = useUser({ userId });

  const updateProfileMutation = useUpdateProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<UpdateProfileFormInput>({
    mode: 'onBlur',
    defaultValues: { ...userQuery.data?.user },
  });

  const onSubmit: SubmitHandler<UpdateProfileFormInput> = (data: UpdateProfileFormInput) => {
    updateProfileMutation.mutate(
      { userId, data },
      {
        onError: (error) =>
          setValidationErrors({ errors: error?.response?.data.error.validation, setError }),
      },
    );
  };

  const handlePressSubmitButton = (e: GestureResponderEvent) => {
    clearErrors();
    handleSubmit(onSubmit)(e);
  };

  return {
    control,
    handlePressSubmitButton,
    errors,
  };
};
