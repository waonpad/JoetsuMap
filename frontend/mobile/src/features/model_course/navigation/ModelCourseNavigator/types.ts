import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type { CreateModelCourseScreenParams } from '../../screens/CreateModelCourseScreen/types';
import type { ModelCourseHomeScreenParams } from '../../screens/ModelCourseHomeScreen/types';
import type { SearchModelCourseScreenParams } from '../../screens/SearchModelCourseScreen/types';
import type { UpdateModelCourseScreenParams } from '../../screens/UpdateModelCourseScreen/types';

export type ModelCourseNavigationParamList = {
  CreateModelCourse: CreateModelCourseScreenParams;
  ModelCourseHome: ModelCourseHomeScreenParams;
  UpdateModelCourse: UpdateModelCourseScreenParams;
  SearchModelCourse: SearchModelCourseScreenParams;
} & CommonScreenParamList;
