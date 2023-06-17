import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { ProfileDetailScreen } from '../../screens/ProfileDetailScreen';
import { UpdateProfileScreen } from '../../screens/UpdateProfileScreen';

import type { ProfileDetailScreenParams } from '../../screens/ProfileDetailScreen/types';
import type { UpdateProfileScreenParams } from '../../screens/UpdateProfileScreen/types';

export type UserNavigationParamList = {
  ProfileDetail: ProfileDetailScreenParams;
  UpdateProfile: UpdateProfileScreenParams;
} & BaseNavigationParamList;

const UserStack = createNativeStackNavigator<UserNavigationParamList>();

export const UserNavigator = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Screen name="UpdateProfile" component={UpdateProfileScreen} />
      <UserStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </UserStack.Navigator>
  );
};
