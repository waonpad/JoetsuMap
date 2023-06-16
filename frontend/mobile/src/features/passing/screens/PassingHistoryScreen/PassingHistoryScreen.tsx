import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { PassingHistoryScreenProps } from './types';

export const PassingHistoryScreen = ({}: PassingHistoryScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
