// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { setValidationErrors } from '@/utils/compute';

import { useCreateModelCourse } from '../../api/createModelCourse';

import type { CreateModelCourseFormInput } from '../CreateModelCourseForm/types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

export const useLogics = ({
  defaultValues,
}: {
  defaultValues?: Partial<CreateModelCourseFormInput>;
}) => {
  const createModelCourseMutation = useCreateModelCourse();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<CreateModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<CreateModelCourseFormInput> = (
    data: CreateModelCourseFormInput,
  ) => {
    createModelCourseMutation.mutate(
      { data },
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
    control,
    handlePressSubmitButton,
    errors,
  };
};
