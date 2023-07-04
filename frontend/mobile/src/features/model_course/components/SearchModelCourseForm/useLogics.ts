// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchModelCourseFormInput, SearchModelCourseFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchModelCourseFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SearchModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchModelCourseFormInput> = (
    data: SearchModelCourseFormInput,
  ) => {
    onSubmitAction(data);
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
