import { useNavigation } from '@react-navigation/native';

import type { UserNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useUserNavigation = () => {
  return useNavigation<NativeStackNavigationProp<UserNavigationParamList>>();
};
