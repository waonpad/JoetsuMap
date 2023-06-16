import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { NotificationHomeScreenProps } from './types';

export const NotificationHomeScreen = ({}: NotificationHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
