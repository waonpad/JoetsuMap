// APIとの通信を行う、コアなロジック

import { queryClient } from '@/lib/react-query';
import type { IdListResponse } from '@/types';

import { useBookmarkModelCourse } from '../../api/bookmarkModelCourse';
import { QUERY_KEY_PLURAL } from '../../constants';

import type { BookmarkModelCourseButtonProps } from './types';

export const useLogics = ({ modelCourseId }: BookmarkModelCourseButtonProps) => {
  const bookmarkModelCourseMutation = useBookmarkModelCourse();

  const isBookmarked =
    queryClient
      .getQueryData<IdListResponse>([QUERY_KEY_PLURAL, 'bookmarked', 'ids'])
      ?.ids?.includes(modelCourseId) || bookmarkModelCourseMutation.data?.bookmarked;

  const handlePressBookmark = () => {
    bookmarkModelCourseMutation.mutate({ modelCourseId });
  };

  return {
    isBookmarked,
    handlePressBookmark,
  };
};
