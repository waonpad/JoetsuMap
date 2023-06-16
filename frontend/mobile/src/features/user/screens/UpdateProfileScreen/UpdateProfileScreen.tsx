import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { UpdateProfileScreenProps } from './types';

export const UpdateProfileScreen = ({}: UpdateProfileScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
