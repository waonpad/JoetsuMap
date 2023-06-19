// APIとの通信を行う、コアなロジック

import { useSearchModelCourses } from '../../api/searchModelCourses';

import type { SearchedModelCourseListProps } from './types';

export const useLogics = ({ searchParams }: SearchedModelCourseListProps) => {
  const searchModelCoursesQuery = useSearchModelCourses({
    params: searchParams,
  });

  return {
    searchModelCoursesQuery,
  };
};
