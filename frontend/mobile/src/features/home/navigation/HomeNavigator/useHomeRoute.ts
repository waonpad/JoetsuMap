import { useRoute } from '@react-navigation/native';

import type { HomeNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const useHomeRoute = <T extends keyof HomeNavigationParamList>() => {
  return useRoute<RouteProp<HomeNavigationParamList, T>>();
};
