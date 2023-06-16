import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { UpdateTravelBookletScreenProps } from './types';

export const UpdateTravelBookletScreen = ({}: UpdateTravelBookletScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
