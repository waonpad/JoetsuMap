import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { LoginScreen } from '../../screens/LoginScreen';
import { RegisterScreen } from '../../screens/RegisterScreen';
import { ResetPasswordScreen } from '../../screens/ResetPasswordScreen';

import type { AuthNavigationParamList } from './types';

const AuthStack = createNativeStackNavigator<AuthNavigationParamList>();

export const AuthNavigator = () => {
  const authScreens: Screens<AuthNavigationParamList> = {
    Register: RegisterScreen,
    Login: LoginScreen,
    ResetPassword: ResetPasswordScreen,
  };

  return (
    <AuthStack.Navigator>
      {Object.entries({
        ...authScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <AuthStack.Screen
          key={name}
          name={name as keyof AuthNavigationParamList}
          component={component}
        />
      ))}
    </AuthStack.Navigator>
  );
};
