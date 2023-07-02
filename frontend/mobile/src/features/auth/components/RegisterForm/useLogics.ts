// APIとの通信を行う、コアなロジック

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/lib/auth';
import type { PickedImage } from '@/types';

import type { RegisterFormInput } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues }: { defaultValues?: Partial<RegisterFormInput> }) => {
  const { register } = useAuth();

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

    register(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
    icon,
    handleChoosePhoto,
  };
};
