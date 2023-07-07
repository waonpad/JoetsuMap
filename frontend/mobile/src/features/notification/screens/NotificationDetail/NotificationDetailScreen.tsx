import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { NotificationDetail } from '../../components/NotificationDetail';
import { useNotificationRoute } from '../../navigation/NotificationNavigator/useNotificationRoute';

import { styles } from './styles';

export const NotificationDetailScreen = () => {
  const route = useNotificationRoute<'NotificationDetail'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <NotificationDetail notificationId={route.params.notificationId} />
      </Suspense>
    </View>
  );
};
