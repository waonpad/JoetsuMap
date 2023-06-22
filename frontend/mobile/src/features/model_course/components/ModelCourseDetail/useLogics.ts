// APIとの通信を行う、コアなロジック

import { useModelCourse } from '../../api/getModelCourse';

import type { ModelCourseDetailProps } from './types';

export const useLogics = ({ modelCourseId }: ModelCourseDetailProps) => {
  const modelCourseQuery = useModelCourse({ modelCourseId });

  return {
    modelCourseQuery,
  };
};
