import { View, Text } from 'react-native';

import { styles } from './styles';

import type { NotificationListItemProps } from './types';

export const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{notification.title}</Text>
    </View>
  );
};
