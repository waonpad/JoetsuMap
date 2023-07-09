// APIとの通信を行う、コアなロジック

import { useBookmarkedTravelSpots } from '../../api/getBookmarkedTravelSpots';

export const useLogics = () => {
  const bookmarkedTravelSpotsQuery = useBookmarkedTravelSpots();

  return {
    bookmarkedTravelSpotsQuery,
  };
};
