// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchTravelSpotFormInput, SearchTravelSpotFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchTravelSpotFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SearchTravelSpotFormInput>({
    mode: 'onBlur',
    defaultValues: { freeKeyword: '', ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchTravelSpotFormInput> = (data: SearchTravelSpotFormInput) => {
    onSubmitAction(data);
  };

  const handlePressSubmitKey = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    clearErrors();
    handleSubmit(onSubmit)(e);
  };

  return {
    control,
    handlePressSubmitKey,
    errors,
  };
};
