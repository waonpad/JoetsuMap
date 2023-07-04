// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { setValidationErrors } from '@/utils/compute';

import { useModelCourse } from '../../api/getModelCourse';
import { useUpdateModelCourse } from '../../api/updateModelCourse';

import type { UpdateModelCourseFormInput, UpdateModelCourseFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';
import type { GestureResponderEvent } from 'react-native';

export const useLogics = ({ modelCourseId }: UpdateModelCourseFormProps) => {
  const modelCourseQuery = useModelCourse({ modelCourseId });

  const updateModelCourseMutation = useUpdateModelCourse();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<UpdateModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...modelCourseQuery.data?.modelCourse },
  });

  const onSubmit: SubmitHandler<UpdateModelCourseFormInput> = (
    data: UpdateModelCourseFormInput,
  ) => {
    updateModelCourseMutation.mutate(
      { modelCourseId, data },
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
