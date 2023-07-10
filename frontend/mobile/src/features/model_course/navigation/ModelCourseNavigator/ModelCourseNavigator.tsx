import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import { CreateModelCourseScreen } from '../../screens/CreateModelCourseScreen';
import { ModelCourseHomeScreen } from '../../screens/ModelCourseHomeScreen';
import { SearchModelCourseScreen } from '../../screens/SearchModelCourseScreen';
import { UpdateModelCourseScreen } from '../../screens/UpdateModelCourseScreen';

import type { ModelCourseNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const ModelCourseStack = createNativeStackNavigator<ModelCourseNavigationParamList>();

export const ModelCourseNavigator = () => {
  const modelCourseScreens: Screens<ModelCourseNavigationParamList> = {
    ModelCourseHome: ModelCourseHomeScreen,
    CreateModelCourse: CreateModelCourseScreen,
    UpdateModelCourse: UpdateModelCourseScreen,
    SearchModelCourse: SearchModelCourseScreen,
    ...commonScreens,
  };

  const modelCourseScreenOptions: {
    [key in keyof ModelCourseNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    ModelCourseHome: {
      title: 'モデルコース',
    },
    CreateModelCourse: {
      title: 'モデルコース作成',
    },
    UpdateModelCourse: {
      title: 'モデルコース更新',
    },
    SearchModelCourse: {
      title: 'モデルコース検索',
    },
    ...commonScreenStackOptions,
  };

  return (
    <ModelCourseStack.Navigator screenOptions={{ headerStyle: commonHeaderStyle }}>
      {Object.entries(modelCourseScreens).map(([name, component]) => (
        <ModelCourseStack.Screen
          key={name}
          name={name as keyof ModelCourseNavigationParamList}
          component={component}
          options={modelCourseScreenOptions[name as keyof ModelCourseNavigationParamList]}
        />
      ))}
    </ModelCourseStack.Navigator>
  );
};
