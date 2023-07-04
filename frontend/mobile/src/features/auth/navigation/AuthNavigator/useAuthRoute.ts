import { useRoute } from '@react-navigation/native';

import type { AuthNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const useAuthRoute = <T extends keyof AuthNavigationParamList>() => {
  return useRoute<RouteProp<AuthNavigationParamList, T>>();
};
