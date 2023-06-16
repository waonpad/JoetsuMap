import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelSpotListItemProps } from './types';

export const TravelSpotListItem = ({ TravelSpot }: TravelSpotListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
