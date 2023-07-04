import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { commonScreens } from '@/navigation/CommonScreens';
import { UnAuthorizedScreen } from '@/screens/UnAuthorizedScreen';
import type { Screens } from '@/types';

import { NotificationHomeScreen } from '../../screens/NotificationHomeScreen';

import type { NotificationNavigationParamList } from './types';

const NotificationStack = createNativeStackNavigator<NotificationNavigationParamList>();

export const NotificationNavigator = () => {
  const { user } = useAuth();

  const notificationScreens: Screens<NotificationNavigationParamList> = {
    NotificationHome: user ? NotificationHomeScreen : UnAuthorizedScreen,
  };

  return (
    <NotificationStack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries({
        ...notificationScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <NotificationStack.Screen
          key={name}
          name={name as keyof NotificationNavigationParamList}
          component={component}
        />
      ))}
    </NotificationStack.Navigator>
  );
};
