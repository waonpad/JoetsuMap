// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchTravelSpotFormInput, SearchTravelSpotFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchTravelSpotFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchTravelSpotFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchTravelSpotFormInput> = (data: SearchTravelSpotFormInput) => {
    onSubmitAction(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
