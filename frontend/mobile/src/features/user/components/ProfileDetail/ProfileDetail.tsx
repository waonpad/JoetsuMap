import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ProfileDetailProps } from './types';

export const ProfileDetail = ({ userId }: ProfileDetailProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
