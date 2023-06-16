import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletDetailScreenProps } from './types';

export const TravelBookletDetailScreen = ({}: TravelBookletDetailScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
