import { useRoute } from '@react-navigation/native';

import type { UserNavigationParamList } from '.';
import type { RouteProp } from '@react-navigation/native';

export const useUserRoute = <T extends keyof UserNavigationParamList>() => {
  return useRoute<RouteProp<UserNavigationParamList, T>>();
};
