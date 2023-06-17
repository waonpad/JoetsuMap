// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchTravelBookletFormInput, SearchTravelBookletFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchTravelBookletFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchTravelBookletFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchTravelBookletFormInput> = (
    data: SearchTravelBookletFormInput,
  ) => {
    onSubmitAction(data);
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
