// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchTravelSpotFormInput, SearchTravelSpotFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchTravelSpotFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SearchTravelSpotFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchTravelSpotFormInput> = (data: SearchTravelSpotFormInput) => {
    onSubmitAction(data);
  };

  const handlePressKeyForHandleSubmit = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    if (e.nativeEvent.key === 'Enter') {
      clearErrors();
      handleSubmit(onSubmit)(e);
    }
  };

  return {
    control,
    handlePressKeyForHandleSubmit,
    errors,
  };
};
