// APIとの通信を行う、コアなロジック

import { useForm } from 'react-hook-form';

import { useModelCourse } from '../../api/getModelCourse';
import { useUpdateModelCourse } from '../../api/updateModelCourse';

import type { UpdateModelCourseFormInput, UpdateModelCourseFormProps } from './types';
import type { SubmitHandler } from 'react-hook-form';

export const useLogics = ({ modelCourseId }: UpdateModelCourseFormProps) => {
  const modelCourseQuery = useModelCourse({ modelCourseId });

  const updateModelCourseMutation = useUpdateModelCourse();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateModelCourseFormInput>({
    mode: 'onBlur',
    defaultValues: { ...modelCourseQuery.data?.modelCourse },
  });

  const onSubmit: SubmitHandler<UpdateModelCourseFormInput> = (
    data: UpdateModelCourseFormInput,
  ) => {
    updateModelCourseMutation.mutate({ modelCourseId, data });
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    errors,
  };
};
