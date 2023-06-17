import { useNavigation } from '@react-navigation/native';

import type { ModelCourseNavigationParamList } from './ModelCourseNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useModelCourseNavigation = () => {
  return useNavigation<NativeStackNavigationProp<ModelCourseNavigationParamList>>();
};
