import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from '@/features/auth';
import type { BaseNavigationParamList } from '@/types';

import { AppNavigator } from '../AppNavigator';

export type RootNavigationParamList = {
  Auth: undefined;
  App: undefined;
} & BaseNavigationParamList;

const RootStack = createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="App">
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="App" component={AppNavigator} />
    </RootStack.Navigator>
  );
};
