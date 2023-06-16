import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotDetailScreenProps } from './types';

export const TravelSpotDetailScreen = ({}: TravelSpotDetailScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
