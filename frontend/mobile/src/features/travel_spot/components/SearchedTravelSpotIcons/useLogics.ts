// APIとの通信を行う、コアなロジック

import { useSearchTravelSpots } from '../../api/searchTravelSpots';

import type { SearchedTravelSpotIconsProps } from './types';

export const useLogics = ({ searchParams }: Pick<SearchedTravelSpotIconsProps, 'searchParams'>) => {
  const searchedTravelSpotsQuery = useSearchTravelSpots({
    params: searchParams,
  });

  return {
    searchedTravelSpotsQuery,
  };
};
