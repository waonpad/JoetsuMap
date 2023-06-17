import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { AuthTestScreen } from '@/screens/AuthTestScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import { SecureStoreTestScreen } from '@/screens/SecureStoreTestScreen';
import type { BaseNavigationParamList } from '@/types';

export type TestStackParamList = {
  Home: undefined; // 受け取るパラメータの型を指定できる 例: { id: number }
  AuthTest: undefined;
  SecureStoreTest: undefined;
  Dummy: undefined; // PermissionDeniedTest
} & BaseNavigationParamList;

const TestStack = createNativeStackNavigator<TestStackParamList>();

export const TestNavigator = () => {
  const { user } = useAuth();

  return (
    <TestStack.Navigator>
      <TestStack.Screen name="Home" component={HomeScreen} />
      <TestStack.Screen name="AuthTest" component={AuthTestScreen} />
      <TestStack.Screen name="SecureStoreTest" component={SecureStoreTestScreen} />
      <TestStack.Screen name="Dummy" component={user ? AuthTestScreen : PermissionDeniedScreen} />
    </TestStack.Navigator>
  );
};
