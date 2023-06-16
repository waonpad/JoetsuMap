import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { LoginScreenProps } from './types';

export const LoginScreen = ({}: LoginScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
