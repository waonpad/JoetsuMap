// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import { setValidationErrors } from '@/utils/compute';

import { useLogin } from '../../api/login';

import type { LoginFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLogics = ({ defaultValues }: { defaultValues?: Partial<LoginFormInput> }) => {
  const { onLoginSuccess } = useAuth();

  const loginMutaion = useLogin();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<LoginFormInput>({
    mode: 'onBlur',
    // defaultValues: { ...defaultValues },
    defaultValues: {
      username: 'testuser',
      password: 'password',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInput> = async (data: LoginFormInput) => {
    loginMutaion.mutate(
      { data },
      {
        onError: (error) =>
          setValidationErrors({ errors: error?.response?.data.error.validation, setError }),
        onSuccess: (data) => {
          onLoginSuccess(data);
        },
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
