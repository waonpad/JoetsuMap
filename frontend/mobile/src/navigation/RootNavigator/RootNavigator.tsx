import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthNavigator } from '@/features/auth';

import { AppNavigator } from '../AppNavigator';

import type { RootNavigationParamList } from './types';

const RootStack = createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="App">
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="App" component={AppNavigator} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
};
