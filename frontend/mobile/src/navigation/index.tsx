import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { AboutScreen } from '@/screens/AboutScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import { Test2Screen } from '@/screens/Test2Screen';
import { TestScreen } from '@/screens/TestScreen';

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Test: undefined;
  Test2: undefined; // PermissionDeniedTest
  PermissionDenied: undefined;
};

export const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="About" component={AboutScreen} />
        <RootStack.Screen name="Test" component={TestScreen} />
        <RootStack.Screen name="Test2" component={user ? Test2Screen : PermissionDeniedScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
