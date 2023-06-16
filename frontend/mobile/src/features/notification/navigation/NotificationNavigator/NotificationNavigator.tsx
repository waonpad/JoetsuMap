import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import type { BaseNavigationParamList } from '@/types';

import { NotificationHomeScreen } from '../../screens/NotificationHomeScreen';

import type { NotificationHomeScreenProps } from '../../screens/NotificationHomeScreen/types';

export type NotificationNavigationParamList = {
  NotificationHome: NotificationHomeScreenProps;
} & BaseNavigationParamList;

const NotificationStack = createNativeStackNavigator<NotificationNavigationParamList>();

export const NotificationNavigator = () => {
  const { user } = useAuth();

  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen
        name="NotificationHome"
        component={user ? NotificationHomeScreen : PermissionDeniedScreen}
      />
    </NotificationStack.Navigator>
  );
};
