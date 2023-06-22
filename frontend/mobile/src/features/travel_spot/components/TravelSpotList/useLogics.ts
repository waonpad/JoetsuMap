// APIとの通信を行う、コアなロジック

import { useTravelSpots } from '../../api/getTravelSpots';

export const useLogics = () => {
  const travelSpotsQuery = useTravelSpots();

  return {
    travelSpotsQuery,
  };
};
