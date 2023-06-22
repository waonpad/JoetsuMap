// APIとの通信を行う、コアなロジック

import { useDeleteModelCourse } from '../../api/deleteModelCourse';

import type { DeleteModelCourseButtonProps } from './types';

export const useLogics = ({ modelCourseId }: DeleteModelCourseButtonProps) => {
  const deleteModelCourseMutation = useDeleteModelCourse();

  const handlePressDelete = () => {
    deleteModelCourseMutation.mutate({ modelCourseId });
  };

  return {
    deleteModelCourseMutation,
    handlePressDelete,
  };
};
