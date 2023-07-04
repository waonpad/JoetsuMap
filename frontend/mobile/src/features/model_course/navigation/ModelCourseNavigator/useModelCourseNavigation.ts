import { useNavigation } from '@react-navigation/native';

import type { ModelCourseNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useModelCourseNavigation = () => {
  return useNavigation<NativeStackNavigationProp<ModelCourseNavigationParamList>>();
};
