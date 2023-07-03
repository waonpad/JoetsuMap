import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { commonScreens } from '@/navigation/CommonScreens';
import { UnAuthorizedScreen } from '@/screens/UnAuthorizedScreen';
import type { Screens } from '@/types';

import { PassingHistoryScreen } from '../../screens/PassingHistoryScreen';
import { PassingHomeScreen } from '../../screens/PassingHomeScreen';

import type { PassingNavigationParamList } from './types';

const PassingStack = createNativeStackNavigator<PassingNavigationParamList>();

export const PassingNavigator = () => {
  const { user } = useAuth();

  const passingScreens: Screens<PassingNavigationParamList> = {
    PassingHome: PassingHomeScreen,
    PassingHistory: user ? PassingHistoryScreen : UnAuthorizedScreen,
  };

  return (
    <PassingStack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries({
        ...passingScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <PassingStack.Screen
          key={name}
          name={name as keyof PassingNavigationParamList}
          component={component}
        />
      ))}
    </PassingStack.Navigator>
  );
};
