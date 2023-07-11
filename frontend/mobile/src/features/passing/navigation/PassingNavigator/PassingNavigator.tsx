import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { commonScreenStackOptions } from '@/navigation/CommonScreens';
import { UnAuthorizedScreen } from '@/screens/UnAuthorizedScreen';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import { PassingHistoryScreen } from '../../screens/PassingHistoryScreen';
import { PassingHomeScreen } from '../../screens/PassingHomeScreen';

import type { PassingNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const PassingStack = createNativeStackNavigator<PassingNavigationParamList>();

export const PassingNavigator = () => {
  const { user } = useAuth();

  const passingScreens: Screens<PassingNavigationParamList> = {
    PassingHome: PassingHomeScreen,
    PassingHistory: user ? PassingHistoryScreen : UnAuthorizedScreen,
  };

  const passingScreenOptions: {
    [key in keyof PassingNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    PassingHome: {
      title: 'すれ違い',
    },
    PassingHistory: {
      title: 'すれ違い履歴',
    },
    ...commonScreenStackOptions,
  };

  return (
    <PassingStack.Navigator
      screenOptions={{ headerStyle: commonHeaderStyle }}
      initialRouteName="PassingHistory">
      {Object.entries(passingScreens).map(([name, component]) => (
        <PassingStack.Screen
          key={name}
          name={name as keyof PassingNavigationParamList}
          component={component}
          options={passingScreenOptions[name as keyof PassingNavigationParamList]}
        />
      ))}
    </PassingStack.Navigator>
  );
};
