// APIとの通信を行う、コアなロジック

import { useTravelBooklet } from '../../api/getTravelBooklet';

import type { TravelBookletDetailProps } from './types';

export const useLogics = ({ travelBookletId }: TravelBookletDetailProps) => {
  const travelBookletQuery = useTravelBooklet({ travelBookletId });

  return {
    travelBookletQuery,
  };
};
