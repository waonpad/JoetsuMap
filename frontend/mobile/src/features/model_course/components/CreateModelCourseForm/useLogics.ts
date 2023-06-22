// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useCreateModelCourse } from '../../api/createModelCourse';

import type { UpdateModelCourseFormInput } from '../UpdateModelCourseForm/types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({
  defaultValues,
}: {
  defaultValues?: Partial<UpdateModelCourseFormInput>;
}) => {
  const createModelCourseMutation = useCreateModelCourse();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...defaultValues },
  });

  const onSubmit: SubmitHandler<UpdateModelCourseFormInput> = (
    data: UpdateModelCourseFormInput,
  ) => {
    createModelCourseMutation.mutate({ data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
