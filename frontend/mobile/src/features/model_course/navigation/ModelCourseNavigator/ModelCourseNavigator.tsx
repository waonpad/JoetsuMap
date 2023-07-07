import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { CreateModelCourseScreen } from '../../screens/CreateModelCourseScreen';
import { ModelCourseHomeScreen } from '../../screens/ModelCourseHomeScreen';
import { UpdateModelCourseScreen } from '../../screens/UpdateModelCourseScreen';

import type { ModelCourseNavigationParamList } from './types';

const ModelCourseStack = createNativeStackNavigator<ModelCourseNavigationParamList>();

export const ModelCourseNavigator = () => {
  const modelCourseScreens: Screens<ModelCourseNavigationParamList> = {
    ModelCourseHome: ModelCourseHomeScreen,
    CreateModelCourse: CreateModelCourseScreen,
    UpdateModelCourse: UpdateModelCourseScreen,
  };

  return (
    <ModelCourseStack.Navigator>
      {Object.entries({
        ...modelCourseScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <ModelCourseStack.Screen
          key={name}
          name={name as keyof ModelCourseNavigationParamList}
          component={component}
        />
      ))}
    </ModelCourseStack.Navigator>
  );
};
