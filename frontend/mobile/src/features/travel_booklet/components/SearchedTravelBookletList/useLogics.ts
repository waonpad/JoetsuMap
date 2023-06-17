// APIとの通信を行う、コアなロジック

import { useSearchTravelBooklets } from '../../api/searchTravelBooklets';

import type { SearchedTravelBookletListProps } from './types';

export const useLogics = ({ searchParams }: SearchedTravelBookletListProps) => {
  const searchTravelBookletsQuery = useSearchTravelBooklets({
    params: searchParams,
  });

  return {
    searchTravelBookletsQuery,
  };
};
