import { useNavigation } from '@react-navigation/native';

import type { NotificationNavigationParamList } from './NotificationNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useNotificationNavigation = () => {
  return useNavigation<NativeStackNavigationProp<NotificationNavigationParamList>>();
};
