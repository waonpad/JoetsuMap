// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import type { SearchModelCourseFormInput, SearchModelCourseFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { NativeSyntheticEvent, TextInputSubmitEditingEventData } from 'react-native';

export const useLogics = ({ defaultValues, onSubmitAction }: SearchModelCourseFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SearchModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { freeKeyword: '', ...defaultValues },
  });

  const onSubmit: SubmitHandler<SearchModelCourseFormInput> = (
    data: SearchModelCourseFormInput,
  ) => {
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
