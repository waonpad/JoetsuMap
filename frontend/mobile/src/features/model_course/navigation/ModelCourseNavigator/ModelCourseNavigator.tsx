import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { CommonScreenParamList } from '@/navigation/CommonScreens';
import { commonScreens } from '@/navigation/CommonScreens';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import { CreateModelCourseScreen } from '../../screens/CreateModelCourseScreen';
import { ModelCourseHomeScreen } from '../../screens/ModelCourseHomeScreen';
import { SearchModelCourseScreen } from '../../screens/SearchModelCourseScreen';
import { UpdateModelCourseScreen } from '../../screens/UpdateModelCourseScreen';

import type { ModelCourseNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type ModelCourseStackNavigationParamList = ModelCourseNavigationParamList & CommonScreenParamList;

const ModelCourseStack = createNativeStackNavigator<ModelCourseStackNavigationParamList>();

export const ModelCourseNavigator = () => {
  const modelCourseScreens: Screens<ModelCourseStackNavigationParamList> = {
    ModelCourseHome: ModelCourseHomeScreen,
    CreateModelCourse: CreateModelCourseScreen,
    UpdateModelCourse: UpdateModelCourseScreen,
    SearchModelCourse: SearchModelCourseScreen,
    ...commonScreens,
  };

  const modelCourseScreenOptions: {
    [key in keyof ModelCourseStackNavigationParamList]?: NativeStackNavigationOptions;
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
  };

  return (
    <ModelCourseStack.Navigator screenOptions={{ headerStyle: commonHeaderStyle }}>
      {Object.entries(modelCourseScreens).map(([name, component]) => (
        <ModelCourseStack.Screen
          key={name}
          name={name as keyof ModelCourseStackNavigationParamList}
          component={component}
          options={modelCourseScreenOptions[name as keyof ModelCourseStackNavigationParamList]}
        />
      ))}
    </ModelCourseStack.Navigator>
  );
};
