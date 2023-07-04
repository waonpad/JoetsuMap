import { useRoute } from '@react-navigation/native';

import type { PassingNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const usePassingRoute = <T extends keyof PassingNavigationParamList>() => {
  return useRoute<RouteProp<PassingNavigationParamList, T>>();
};
