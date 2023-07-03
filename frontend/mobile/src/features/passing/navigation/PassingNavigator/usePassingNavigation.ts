import { useNavigation } from '@react-navigation/native';

import type { PassingNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const usePassingNavigation = () => {
  return useNavigation<NativeStackNavigationProp<PassingNavigationParamList>>();
};
