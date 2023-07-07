// APIとの通信を行う、コアなロジック

import { queryClient } from '@/lib/react-query';

import { useBookmarkTravelSpot } from '../../api/bookmarkTravelSpot';
import { QUERY_KEY_PLURAL } from '../../constants';

import type { BookmarkTravelSpotButtonProps } from './types';
import type { TravelSpotPageResponse } from '../../types';
import type { InfiniteData } from '@tanstack/react-query';

export const useLogics = ({ travelSpotId }: BookmarkTravelSpotButtonProps) => {
  const bookmarkTravelSpotMutation = useBookmarkTravelSpot();

  const isBookmarked =
    queryClient
      .getQueryData<InfiniteData<TravelSpotPageResponse>>([QUERY_KEY_PLURAL, 'bookmarked'])
      ?.pages.some((page) => page.travelSpots.content.some((spot) => spot.id === travelSpotId)) ||
    bookmarkTravelSpotMutation.data?.bookmarked;

  const handlePressBookmark = () => {
    bookmarkTravelSpotMutation.mutate({ travelSpotId });
  };

  return {
    isBookmarked,
    bookmarkTravelSpotMutation,
    handlePressBookmark,
  };
};
