import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { TravelBookletListItemProps } from './types';

export const TravelBookletListItem = ({ TravelBooklet }: TravelBookletListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
