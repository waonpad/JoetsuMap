import { useNavigation } from '@react-navigation/native';

import type { HomeNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useHomeNavigation = () => {
  return useNavigation<NativeStackNavigationProp<HomeNavigationParamList>>();
};
