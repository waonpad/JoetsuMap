import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';

import type { LoginScreenParams } from '../../screens/LoginScreen/types';
import type { RegisterScreenParams } from '../../screens/RegisterScreen/types';
import type { ResetPasswordScreenParams } from '../../screens/ResetPasswordScreen/types';

export type AuthNavigationParamList = {
  Login: LoginScreenParams;
  Register: RegisterScreenParams;
  ResetPassword: ResetPasswordScreenParams;
} & BaseNavigationParamList;

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </AuthStack.Navigator>
  );
};
