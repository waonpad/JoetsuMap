import { View } from 'react-native';

import { NotificationList } from '../../components/NotificationList';

import { styles } from './styles';

export const NotificationHomeScreen = () => {
  return (
    <View style={styles.container}>
      <NotificationList />
    </View>
  );
};
