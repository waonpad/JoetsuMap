import { useRoute } from '@react-navigation/native';

import type { TravelBookletNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const useTravelBookletRoute = <T extends keyof TravelBookletNavigationParamList>() => {
  return useRoute<RouteProp<TravelBookletNavigationParamList, T>>();
};
