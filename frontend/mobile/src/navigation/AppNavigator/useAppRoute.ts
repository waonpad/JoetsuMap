import { useRoute } from '@react-navigation/native';

import type { AppNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const useAppRoute = <T extends keyof AppNavigationParamList>() => {
  return useRoute<RouteProp<AppNavigationParamList, T>>();
};
