import { View } from 'react-native';

import { styles } from './styles';

import type { NotificationListItemProps } from './types';

export const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  return <View style={styles.container}>{notification.title}</View>;
};
