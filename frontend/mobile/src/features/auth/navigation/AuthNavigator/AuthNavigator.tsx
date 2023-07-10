import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';

import type { AuthNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

export const AuthNavigator = () => {
  const authScreens: Screens<AuthNavigationParamList> = {
    Register: RegisterScreen,
    Login: LoginScreen,
    ResetPassword: ResetPasswordScreen,
    ...commonScreens,
  };

  const authScreenOptions: {
    [key in keyof AuthNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    Register: {
      title: '新規登録',
    },
    Login: {
      title: 'ログイン',
    },
    ResetPassword: {
      title: 'パスワード再設定',
    },
    ...commonScreenStackOptions,
  };

  return (
    <AuthStack.Navigator>
      {Object.entries(authScreens).map(([name, component]) => (
        <AuthStack.Screen
          key={name}
          name={name as keyof AuthNavigationParamList}
          component={component}
          options={authScreenOptions[name as keyof AuthNavigationParamList]}
        />
      ))}
    </AuthStack.Navigator>
  );
};
