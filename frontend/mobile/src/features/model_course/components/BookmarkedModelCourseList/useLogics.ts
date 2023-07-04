// APIとの通信を行う、コアなロジック

import { useBookmarkedModelCourses } from '../../api/getBookmarkedModelCourses';

export const useLogics = () => {
  const bookmarkedModelCoursesQuery = useBookmarkedModelCourses();

  return {
    bookmarkedModelCoursesQuery,
  };
};
