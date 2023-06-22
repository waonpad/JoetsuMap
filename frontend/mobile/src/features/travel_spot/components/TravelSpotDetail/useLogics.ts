// APIとの通信を行う、コアなロジック

import { useTravelSpot } from '../../api/getTravelSpot';

import type { TravelSpotDetailProps } from './types';

export const useLogics = ({ travelSpotId }: TravelSpotDetailProps) => {
  const travelSpotQuery = useTravelSpot({ travelSpotId });

  return {
    travelSpotQuery,
  };
};
