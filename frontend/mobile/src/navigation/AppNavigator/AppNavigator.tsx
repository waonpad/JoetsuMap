import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NotificationNavigator } from '@/features/notification';
import { PassingNavigator } from '@/features/passing';
// import { TravelBookletNavigator } from '@/features/travel_booklet'; // 通信をしてしまうので今は使わない
import { UserNavigator } from '@/features/user';
import { HomeScreen } from '@/screens/HomeScreen';
import type { BaseNavigationParamList } from '@/types';

export type AppNavigationParamList = {
  Home: undefined;
  TravelBooklet: undefined;
  Passing: undefined;
  Notification: undefined;
  Setting: undefined;
} & BaseNavigationParamList;

const AppTab = createBottomTabNavigator<AppNavigationParamList>();

export const AppNavigator = () => {
  return (
    <AppTab.Navigator>
      <AppTab.Screen name="Home" component={HomeScreen} />
      <AppTab.Screen name="TravelBooklet" component={HomeScreen} />
      <AppTab.Screen name="Passing" component={PassingNavigator} />
      <AppTab.Screen name="Notification" component={NotificationNavigator} />
      <AppTab.Screen name="Setting" component={UserNavigator} />
      {/* TravelSpotとModelCourse、Userにはどうやってアクセスする？ */}
    </AppTab.Navigator>
  );
};
