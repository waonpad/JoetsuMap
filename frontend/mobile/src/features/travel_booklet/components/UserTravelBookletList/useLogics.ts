// APIとの通信を行う、コアなロジック

import { useUserTravelBooklets } from '../../api/getUserTravelBooklets';

import type { UserTravelBookletListProps } from './types';

export const useLogics = ({ userId }: UserTravelBookletListProps) => {
  const userTravelBookletsQuery = useUserTravelBooklets({ userId });

  return {
    userTravelBookletsQuery,
  };
};
