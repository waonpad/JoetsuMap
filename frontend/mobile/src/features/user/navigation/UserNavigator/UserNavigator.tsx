import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { UpdateProfileScreen } from '../../screens/UpdateProfileScreen';

import type { UserNavigationParamList } from './types';

const UserStack = createNativeStackNavigator<UserNavigationParamList>();

const userScreens: Screens<UserNavigationParamList> = {
  UpdateProfile: UpdateProfileScreen,
};

export const UserNavigator = () => {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries({
        ...userScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <UserStack.Screen
          key={name}
          name={name as keyof UserNavigationParamList}
          component={component}
        />
      ))}
    </UserStack.Navigator>
  );
};
