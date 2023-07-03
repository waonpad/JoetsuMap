import { useNavigation } from '@react-navigation/native';

import type { AppNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useAppNavigation = () => {
  return useNavigation<NativeStackNavigationProp<AppNavigationParamList>>();
};
