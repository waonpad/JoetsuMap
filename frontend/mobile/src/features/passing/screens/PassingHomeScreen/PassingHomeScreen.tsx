import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { PassingHomeScreenProps } from './types';

export const PassingHomeScreen = ({}: PassingHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
