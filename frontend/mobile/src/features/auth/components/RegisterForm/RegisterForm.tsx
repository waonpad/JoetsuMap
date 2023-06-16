import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { useUtils } from './useUtils';

import type { RegisterFormProps } from './types';

export const RegisterForm = ({}: RegisterFormProps) => {
  const {} = useLogics();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
