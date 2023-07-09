// APIとの通信を行う、コアなロジック

import { useSearchTravelSpots } from '../../api/searchTravelSpots';

import type { SearchedTravelSpotListProps } from './types';

export const useLogics = ({ searchParams }: SearchedTravelSpotListProps) => {
  const searchedTravelSpotsQuery = useSearchTravelSpots({
    params: searchParams,
  });

  return {
    searchedTravelSpotsQuery,
  };
};
