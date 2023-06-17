import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/navigation/RootNavigator';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';

import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';

import type { LoginScreenParams } from '../../screens/LoginScreen';
import type { RegisterScreenParams } from '../../screens/RegisterScreen';
import type { ResetPasswordScreenParams } from '../../screens/ResetPasswordScreen';

export type AuthNavigationParamList = {
  Login: LoginScreenParams;
  Register: RegisterScreenParams;
  ResetPassword: ResetPasswordScreenParams;
} & BaseNavigationParamList;

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};
