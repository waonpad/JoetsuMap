import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import type { CommonScreenParamList } from '@/navigation/CommonScreens';
import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import { UnAuthorizedScreen } from '@/screens/UnAuthorizedScreen';
import type { Screens } from '@/types';

import { NotificationDetailScreen } from '../../screens/NotificationDetail';
import { NotificationHomeScreen } from '../../screens/NotificationHomeScreen';

import type { NotificationNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

type NotificationStackNavigationParamList = NotificationNavigationParamList & CommonScreenParamList;

const NotificationStack = createNativeStackNavigator<NotificationStackNavigationParamList>();

export const NotificationNavigator = () => {
  const { user } = useAuth();

  const notificationScreens: Screens<NotificationStackNavigationParamList> = {
    NotificationHome: user ? NotificationHomeScreen : UnAuthorizedScreen,
    NotificationDetail: user ? NotificationDetailScreen : UnAuthorizedScreen,
    ...commonScreens,
  };

  const notificationScreenOptions: {
    [key in keyof NotificationStackNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    NotificationHome: {
      title: '通知',
    },
    NotificationDetail: {
      title: '通知詳細',
    },
    ...commonScreenStackOptions,
  };

  return (
    <NotificationStack.Navigator>
      {Object.entries(notificationScreens).map(([name, component]) => (
        <NotificationStack.Screen
          key={name}
          name={name as keyof NotificationStackNavigationParamList}
          component={component}
          options={notificationScreenOptions[name as keyof NotificationStackNavigationParamList]}
        />
      ))}
    </NotificationStack.Navigator>
  );
};
