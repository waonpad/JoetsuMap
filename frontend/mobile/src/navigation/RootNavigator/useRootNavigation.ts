import { useNavigation } from '@react-navigation/native';

import type { RootNavigationParamList } from './RootNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useRootNavigation = () => {
  return useNavigation<NativeStackNavigationProp<RootNavigationParamList>>();
};
