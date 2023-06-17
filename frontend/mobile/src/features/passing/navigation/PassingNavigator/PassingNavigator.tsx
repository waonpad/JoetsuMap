import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { UnAuthorizedScreen } from '@/screens/UnAuthorizedScreen';
import type { BaseNavigationParamList } from '@/types';

import { PassingHistoryScreen } from '../../screens/PassingHistoryScreen';
import { PassingHomeScreen } from '../../screens/PassingHomeScreen';

import type { PassingHistoryScreenParams } from '../../screens/PassingHistoryScreen/types';
import type { PassingHomeScreenParams } from '../../screens/PassingHomeScreen/types';

export type PassingNavigationParamList = {
  PassingHome: PassingHomeScreenParams;
  PassingHistory: PassingHistoryScreenParams;
} & BaseNavigationParamList;

const PassingStack = createNativeStackNavigator<PassingNavigationParamList>();

export const PassingNavigator = () => {
  const { user } = useAuth();

  return (
    <PassingStack.Navigator>
      <PassingStack.Screen name="PassingHome" component={PassingHomeScreen} />
      <PassingStack.Screen
        name="PassingHistory"
        component={user ? PassingHistoryScreen : UnAuthorizedScreen}
      />
    </PassingStack.Navigator>
  );
};
