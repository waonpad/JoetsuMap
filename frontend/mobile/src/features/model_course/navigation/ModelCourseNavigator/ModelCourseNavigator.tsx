import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { CreateModelCourseScreen } from '../../screens/CreateModelCourseScreen';
import { ModelCourseDetailScreen } from '../../screens/ModelCourseDetailScreen';
import { ModelCourseHomeScreen } from '../../screens/ModelCourseHomeScreen';
import { UpdateModelCourseScreen } from '../../screens/UpdateModelCourseScreen';

import type { CreateModelCourseScreenProps } from '../../screens/CreateModelCourseScreen/types';
import type { ModelCourseDetailScreenProps } from '../../screens/ModelCourseDetailScreen/types';
import type { ModelCourseHomeScreenProps } from '../../screens/ModelCourseHomeScreen/types';
import type { UpdateModelCourseScreenProps } from '../../screens/UpdateModelCourseScreen/types';

export type ModelCourseNavigationParamList = {
  CreateModelCourse: CreateModelCourseScreenProps;
  ModelCourseDetail: ModelCourseDetailScreenProps;
  ModelCourseHome: ModelCourseHomeScreenProps;
  UpdateModelCourse: UpdateModelCourseScreenProps;
} & BaseNavigationParamList;

const ModelCourseStack = createNativeStackNavigator<ModelCourseNavigationParamList>();

export const ModelCourseNavigator = () => {
  return (
    <ModelCourseStack.Navigator>
      <ModelCourseStack.Screen name="ModelCourseHome" component={ModelCourseHomeScreen} />
      <ModelCourseStack.Screen name="CreateModelCourse" component={CreateModelCourseScreen} />
      <ModelCourseStack.Screen name="ModelCourseDetail" component={ModelCourseDetailScreen} />
      <ModelCourseStack.Screen name="UpdateModelCourse" component={UpdateModelCourseScreen} />
    </ModelCourseStack.Navigator>
  );
};
