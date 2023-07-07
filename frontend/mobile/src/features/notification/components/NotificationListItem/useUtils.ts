// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useNotificationNavigation } from '../../navigation/NotificationNavigator';

import type { NotificationListItemProps } from './types';

export const useUtils = ({ notification }: NotificationListItemProps) => {
  const notificationNavigation = useNotificationNavigation();

  const handleAvatarPress = () => {
    notificationNavigation.navigate('ProfileDetail', { userId: notification.sender?.id });
  };

  const handleNotificationPress = () => {
    notificationNavigation.navigate('NotificationDetail', { notificationId: notification.id });
  };
  return {
    handleAvatarPress,
    handleNotificationPress,
  };
};
