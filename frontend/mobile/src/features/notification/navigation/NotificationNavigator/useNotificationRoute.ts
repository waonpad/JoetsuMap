import { useRoute } from '@react-navigation/native';

import type { NotificationNavigationParamList } from '.';
import type { RouteProp } from '@react-navigation/native';

export const useNotificationRoute = <T extends keyof NotificationNavigationParamList>() => {
  return useRoute<RouteProp<NotificationNavigationParamList, T>>();
};
