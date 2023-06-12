import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { AuthTestScreen } from '@/screens/AuthTestScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import { SecureStoreTestScreen } from '@/screens/SecureStoreTestScreen';

export type RootStackParamList = {
  Home: undefined; // 受け取るパラメータの型を指定できる 例: { id: number }
  AuthTest: undefined;
  SecureStoreTest: undefined;
  Dummy: undefined; // PermissionDeniedTest
  PermissionDenied: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="AuthTest" component={AuthTestScreen} />
      <RootStack.Screen name="SecureStoreTest" component={SecureStoreTestScreen} />
      <RootStack.Screen name="Dummy" component={user ? AuthTestScreen : PermissionDeniedScreen} />
    </RootStack.Navigator>
  );
};
