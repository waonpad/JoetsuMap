import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { AuthNavigator } from '@/features/auth';
import { NotificationNavigator } from '@/features/notification';
import { PassingNavigator } from '@/features/passing';
// import { TravelBookletNavigator } from '@/features/travel_booklet'; // 通信をしてしまうので今は使わない
import { TravelSpotNavigator } from '@/features/travel_spot';
import { UserNavigator } from '@/features/user';
import { HomeScreen } from '@/screens/HomeScreen';
import type { BaseNavigationParamList } from '@/types';

export type AppNavigationParamList = {
  Home: undefined;
  TravelBooklet: undefined;
  Passing: undefined;
  Notification: undefined;
  User: undefined;
  TravelSopt: undefined;
  Auth: undefined; // テスト用にアクセスしやすいよう配置
} & BaseNavigationParamList;

const AppTab = createBottomTabNavigator<AppNavigationParamList>();

export const AppNavigator = () => {
  return (
    <AppTab.Navigator>
      <AppTab.Screen name="Home" component={HomeScreen} />
      <AppTab.Screen name="TravelBooklet" component={HomeScreen} />
      <AppTab.Screen name="Passing" component={PassingNavigator} />
      <AppTab.Screen name="Notification" component={NotificationNavigator} />
      <AppTab.Screen name="User" component={UserNavigator} />
      <AppTab.Screen name="TravelSopt" component={TravelSpotNavigator} />
      {/* テスト用 */}
      <AppTab.Screen name="Auth" component={AuthNavigator} />
    </AppTab.Navigator>
  );
};
