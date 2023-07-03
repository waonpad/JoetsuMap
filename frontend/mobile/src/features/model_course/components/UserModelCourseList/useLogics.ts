// APIとの通信を行う、コアなロジック

import { useUserModelCourses } from '../../api/getUserModelCourses';

import type { UserModelCourseListProps } from './types';

export const useLogics = ({ userId }: UserModelCourseListProps) => {
  const userModelCoursesQuery = useUserModelCourses({ userId });

  return {
    userModelCoursesQuery,
  };
};
