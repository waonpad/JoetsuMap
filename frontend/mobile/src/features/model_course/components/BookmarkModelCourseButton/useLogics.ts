// APIとの通信を行う、コアなロジック

import { useBookmarkModelCourse } from '../../api/bookmarkModelCourse';

import type { BookmarkModelCourseButtonProps } from './types';

export const useLogics = ({ modelCourseId }: BookmarkModelCourseButtonProps) => {
  const bookmarkModelCourseMutation = useBookmarkModelCourse();

  const handlePressBookmark = () => {
    bookmarkModelCourseMutation.mutate({ modelCourseId });
  };

  return {
    bookmarkModelCourseMutation,
    handlePressBookmark,
  };
};
