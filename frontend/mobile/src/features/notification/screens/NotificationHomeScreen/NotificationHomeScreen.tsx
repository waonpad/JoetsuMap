import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { NotificationList } from '../../components/NotificationList';

import { styles } from './styles';

export const NotificationHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Suspense>
        <NotificationList />
      </Suspense>
    </View>
  );
};
