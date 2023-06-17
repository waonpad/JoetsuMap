import { useRoute } from '@react-navigation/native';

import type { ModelCourseNavigationParamList } from '.';
import type { RouteProp } from '@react-navigation/native';

export const useModelCourseRoute = <T extends keyof ModelCourseNavigationParamList>() => {
  return useRoute<RouteProp<ModelCourseNavigationParamList, T>>();
};
