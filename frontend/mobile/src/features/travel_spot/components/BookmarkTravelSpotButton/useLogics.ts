// APIとの通信を行う、コアなロジック

import { queryClient } from '@/lib/react-query';
import type { IdListResponse } from '@/types';

import { useBookmarkTravelSpot } from '../../api/bookmarkTravelSpot';
import { QUERY_KEY_PLURAL } from '../../constants';

import type { BookmarkTravelSpotButtonProps } from './types';

export const useLogics = ({ travelSpotId }: BookmarkTravelSpotButtonProps) => {
  const bookmarkTravelSpotMutation = useBookmarkTravelSpot();

  const isBookmarked =
    queryClient
      .getQueryData<IdListResponse>([QUERY_KEY_PLURAL, 'bookmarked', 'ids'])
      ?.ids?.includes(travelSpotId) || bookmarkTravelSpotMutation.data?.bookmarked;

  const handlePressBookmark = () => {
    bookmarkTravelSpotMutation.mutate({ travelSpotId });
  };

  return {
    isBookmarked,
    bookmarkTravelSpotMutation,
    handlePressBookmark,
  };
};
