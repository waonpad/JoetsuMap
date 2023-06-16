import { useNavigation } from '@react-navigation/native';

import type { AuthNavigationParamList } from './ModelCourseNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useAuthNavigation = () => {
  return useNavigation<NativeStackNavigationProp<AuthNavigationParamList>>();
};
