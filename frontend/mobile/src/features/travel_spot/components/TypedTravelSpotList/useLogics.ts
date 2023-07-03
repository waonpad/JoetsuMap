// APIとの通信を行う、コアなロジック

import { useTravelSpotsByType } from '../../api/getTravelSpotsByType';

import type { TypedTravelSpotListProps } from './types';

export const useLogics = ({ travelSpotType }: TypedTravelSpotListProps) => {
  const typedTravelSpotsQuery = useTravelSpotsByType({ travelSpotType });
  return {
    typedTravelSpotsQuery,
  };
};
