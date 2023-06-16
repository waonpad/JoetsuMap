import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { RegisterScreenProps } from './types';

export const RegisterScreen = ({}: RegisterScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
