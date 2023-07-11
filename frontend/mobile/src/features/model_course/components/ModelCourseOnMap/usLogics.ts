// APIとの通信を行う、コアなロジック

import { useModelCourse } from '../../api/getModelCourse';

import type { ModelCourseOnMapProps } from './types';

export const useLogics = ({ modelCourseId }: ModelCourseOnMapProps) => {
  const modelCourseQuery = useModelCourse({
    modelCourseId: modelCourseId ?? -1,
    config: { enabled: !!modelCourseId },
  });

  return {
    modelCourseQuery,
  };
};
