import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ResetPasswordScreenProps } from './types';

export const ResetPasswordScreen = ({}: ResetPasswordScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
