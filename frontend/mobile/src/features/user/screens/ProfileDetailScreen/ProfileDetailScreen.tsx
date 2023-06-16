import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ProfileDetailScreenProps } from './types';

export const ProfileDetailScreen = ({}: ProfileDetailScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
