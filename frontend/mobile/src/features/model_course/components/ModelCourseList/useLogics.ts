// APIとの通信を行う、コアなロジック

import { useModelCourses } from '../../api/getModelCourses';

export const useLogics = () => {
  const modelCoursesQuery = useModelCourses();

  return {
    modelCoursesQuery,
  };
};
