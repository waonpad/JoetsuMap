import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { PassingHistoryListItemProps } from './types';

export const PassingHistoryListItem = ({ passing }: PassingHistoryListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
