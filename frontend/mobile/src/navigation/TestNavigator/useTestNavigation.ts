import { useNavigation } from '@react-navigation/native';

import type { TestStackParamList } from './TestNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useTestNavigation = () => {
  return useNavigation<NativeStackNavigationProp<TestStackParamList>>();
};
