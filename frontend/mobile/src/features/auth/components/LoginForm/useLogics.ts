// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import { useRootNavigation } from '@/navigation/RootNavigator';
import { EXPECTED_EXCEPTION } from '@/types';
import { enableUseErrorBoundary, setValidationErrors } from '@/utils/compute';

import { useLogin } from '../../api/login';

import type { LoginFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLogics = ({ defaultValues }: { defaultValues?: Partial<LoginFormInput> }) => {
  const { onLoginSuccess } = useAuth();

  const loginMutaion = useLogin({
    config: {
      useErrorBoundary(error) {
        const throughErrorTypes: (keyof typeof EXPECTED_EXCEPTION)[] = [
          EXPECTED_EXCEPTION.BAD_CREDENTIALS,
          EXPECTED_EXCEPTION.VALIDATION_ERROR,
        ];

        return enableUseErrorBoundary(error, throughErrorTypes);
      },
    },
  });

  const isBadCredentialsError =
    loginMutaion.error?.response?.data.error.type === EXPECTED_EXCEPTION.BAD_CREDENTIALS;

  const rootNavigation = useRootNavigation();

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

          rootNavigation.navigate('App');
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
    isBadCredentialsError,
  };
};
