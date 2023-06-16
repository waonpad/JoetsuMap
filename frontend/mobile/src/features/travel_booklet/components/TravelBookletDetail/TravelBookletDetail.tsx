import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletDetailProps } from './types';

export const TravelBookletDetail = ({ TravelBookletId }: TravelBookletDetailProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
