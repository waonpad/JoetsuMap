import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { HomeScreen } from '@/screens/HomeScreen';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import { TestScreen } from '@/screens/TestScreen';

export type RootStackParamList = {
  Home: undefined; // 受け取るパラメータの型を指定できる 例: { id: number }
  Test: undefined;
  Test2: undefined; // PermissionDeniedTest
  PermissionDenied: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Test" component={TestScreen} />
      <RootStack.Screen name="Test2" component={user ? TestScreen : PermissionDeniedScreen} />
    </RootStack.Navigator>
  );
};
