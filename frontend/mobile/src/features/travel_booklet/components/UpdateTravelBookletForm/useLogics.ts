// APIとの通信を行う、コアなロジック

import { useState } from 'react';

import * as ImagePicker from 'expo-image-picker';
import { useForm } from 'react-hook-form';

import type { PickedImage } from '@/types';
import { setValidationErrors } from '@/utils/compute';

import { useTravelBooklet } from '../../api/getTravelBooklet';
import { useUpdateTravelBooklet } from '../../api/updateTravelBooklet';

import type { UpdateTravelBookletFormInput, UpdateTravelBookletFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

export const useLogics = ({ travelBookletId }: UpdateTravelBookletFormProps) => {
  const travelBookletQuery = useTravelBooklet({ travelBookletId });

  const updateTravelBookletMutation = useUpdateTravelBooklet();

  const [photo, setPhoto] = useState<PickedImage>();

  const handleChoosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      selectionLimit: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
    setError,
    clearErrors,
  } = useForm<UpdateTravelBookletFormInput>({
    mode: 'onBlur',
    defaultValues: { ...travelBookletQuery.data?.travelBooklet },
  });

  const onSubmit: SubmitHandler<UpdateTravelBookletFormInput> = (
    data: UpdateTravelBookletFormInput,
  ) => {
    // 写真が選択されていなければ、更新処理を行わない
    data.photo = photo?.base64 ?? undefined;

    updateTravelBookletMutation.mutate(
      { travelBookletId, data },
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
    travelBookletQuery,
    photo,
    handleChoosePhoto,
    control,
    handlePressSubmitButton,
    errors,
  };
};
