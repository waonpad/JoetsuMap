import { View, Text } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { NotificationDetailProps } from './types';

export const NotificationDetail = ({ notificationId }: NotificationDetailProps) => {
  const { notificationQuery } = useLogics({ notificationId });

  return (
    <View style={styles.container}>
      <Text>{notificationQuery.data?.notification?.title}</Text>
    </View>
  );
};
