import { useRoute } from '@react-navigation/native';

import type { RootNavigationParamList } from './types';
import type { RouteProp } from '@react-navigation/native';

export const useRootRoute = <T extends keyof RootNavigationParamList>() => {
  return useRoute<RouteProp<RootNavigationParamList, T>>();
};
