import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '@/lib/auth';
import { PermissionDeniedScreen } from '@/screens/PermissionDeniedScreen';
import type { BaseNavigationParamList } from '@/types';

import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';

import type { LoginScreenProps } from '../../screens/LoginScreen';
import type { RegisterScreenProps } from '../../screens/RegisterScreen';
import type { ResetPasswordScreenProps } from '../../screens/ResetPasswordScreen';

export type AuthNavigationParamList = {
  Login: LoginScreenProps;
  Register: RegisterScreenProps;
  ResetPassword: ResetPasswordScreenProps;
} & BaseNavigationParamList;

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

export const AuthNavigator = () => {
  const { user } = useAuth();

  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={!user ? LoginScreen : PermissionDeniedScreen} />
      <AuthStack.Screen
        name="Register"
        component={!user ? RegisterScreen : PermissionDeniedScreen}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={!user ? ResetPasswordScreen : PermissionDeniedScreen}
      />
    </AuthStack.Navigator>
  );
};
