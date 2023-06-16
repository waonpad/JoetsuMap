import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotDetailProps } from './types';

export const TravelSpotDetail = ({ TravelSpotId }: TravelSpotDetailProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
