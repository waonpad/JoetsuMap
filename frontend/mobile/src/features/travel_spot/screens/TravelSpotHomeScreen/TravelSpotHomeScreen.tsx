import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotHomeScreenProps } from './types';

export const TravelSpotHomeScreen = ({}: TravelSpotHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
