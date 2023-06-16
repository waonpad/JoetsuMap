import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { CreateTravelBookletScreenProps } from './types';

export const CreateTravelBookletScreen = ({}: CreateTravelBookletScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
