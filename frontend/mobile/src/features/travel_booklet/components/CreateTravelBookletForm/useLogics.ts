// APIとの通信を行う、コアなロジック

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import type { PickedImage } from '@/types';

import { useCreateTravelBooklet } from '../../api/createTravelBooklet';

import type { CreateTravelBookletFormInput } from '../CreateTravelBookletForm/types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({
  defaultValues,
}: {
  defaultValues?: Partial<CreateTravelBookletFormInput>;
}) => {
  const createTravelBookletMutation = useCreateTravelBooklet();

  const [photo, setPhoto] = useState<PickedImage>();

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTravelBookletFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<CreateTravelBookletFormInput> = (
    data: CreateTravelBookletFormInput,
  ) => {
    if (!photo?.base64) {
      alert('写真を選択してください');
      return;
    }

    data.photo = photo?.base64;

    createTravelBookletMutation.mutate({ data });
  };

  return {
    photo,
    handleChoosePhoto,
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
