// APIとの通信を行う、コアなロジック

import { useBookmarkTravelSpot } from '../../api/bookmarkTravelSpot';

import type { BookmarkTravelSpotButtonProps } from './types';

export const useLogics = ({ travelSpotId }: BookmarkTravelSpotButtonProps) => {
  const bookmarkTravelSpotMutation = useBookmarkTravelSpot();

  const handlePressBookmark = () => {
    bookmarkTravelSpotMutation.mutate({ travelSpotId });
  };

  return {
    bookmarkTravelSpotMutation,
    handlePressBookmark,
  };
};
