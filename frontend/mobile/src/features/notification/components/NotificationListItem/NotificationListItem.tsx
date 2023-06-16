import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { NotificationListItemProps } from './types';

export const NotificationListItem = ({ notification }: NotificationListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
