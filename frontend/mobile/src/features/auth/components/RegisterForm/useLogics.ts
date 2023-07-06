// APIとの通信を行う、コアなロジック

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import { useRootNavigation } from '@/navigation/RootNavigator';
import { EXPECTED_EXCEPTION, type PickedImage } from '@/types';
import { enableUseErrorBoundary, setValidationErrors } from '@/utils/compute';

import { useRegister } from '../../api/register';

import type { RegisterFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useLogics = ({ defaultValues }: { defaultValues?: Partial<RegisterFormInput> }) => {
  const { onRegisterSuccess } = useAuth();

  const registerMutaion = useRegister({
    config: {
      useErrorBoundary(error) {
        const throughErrorTypes: (keyof typeof EXPECTED_EXCEPTION)[] = [
          EXPECTED_EXCEPTION.ALREADY_EXISTS,
          EXPECTED_EXCEPTION.VALIDATION_ERROR,
        ];

        return enableUseErrorBoundary(error, throughErrorTypes);
      },
    },
  });

  const isAlreadyExistsError =
    registerMutaion.error?.response?.data.error.type === EXPECTED_EXCEPTION.ALREADY_EXISTS;

  const rootNavigation = useRootNavigation();

  const [icon, setIcon] = useState<PickedImage>();

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setIcon(result.assets[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<RegisterFormInput>({
    mode: 'onBlur',
    // defaultValues: { ...defaultValues, roles: ['ROLE_USER'] },
    defaultValues: {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password',
      confirmPassword: 'password',
      roles: ['ROLE_USER'],
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInput> = (data: RegisterFormInput) => {
    if (!icon?.base64) {
      // 工数削減のため、アイコン必須化？
      alert('アイコンを選択してください');
      return;
    }

    data.icon = icon?.base64;

    registerMutaion.mutate(
      { data },
      {
        onError: (error) =>
          setValidationErrors({ errors: error?.response?.data.error.validation, setError }),
        onSuccess: (data) => {
          onRegisterSuccess(data);

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
    isAlreadyExistsError,
    icon,
    handleChoosePhoto,
  };
};
