// APIとの通信を行う、コアなロジック

import { useSearchTravelSpots } from '../../api/searchTravelSpots';

import type { SearchedTravelSpotListProps } from './types';

export const useLogics = ({ params }: SearchedTravelSpotListProps) => {
  const searchedTravelSpotsQuery = useSearchTravelSpots({
    params,
  });

  return {
    searchedTravelSpotsQuery,
  };
};
