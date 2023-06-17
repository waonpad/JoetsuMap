// APIとの通信を行う、コアなロジック

import { useTravelBooklets } from '../../api/getTravelBooklets';

export const useLogics = () => {
  const travelBookletsQuery = useTravelBooklets();

  return {
    travelBookletsQuery,
  };
};
