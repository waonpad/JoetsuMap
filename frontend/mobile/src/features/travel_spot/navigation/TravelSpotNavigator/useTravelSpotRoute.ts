import { useRoute } from '@react-navigation/native';

import type { TravelSpotNavigationParamList } from '.';
import type { RouteProp } from '@react-navigation/native';

export const useTravelSpotRoute = <T extends keyof TravelSpotNavigationParamList>() => {
  return useRoute<RouteProp<TravelSpotNavigationParamList, T>>();
};
