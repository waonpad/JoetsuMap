import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletHomeScreenProps } from './types';

export const TravelBookletHomeScreen = ({}: TravelBookletHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
