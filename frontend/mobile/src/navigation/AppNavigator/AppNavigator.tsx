import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { CustomTabBarButton } from '@/components/Elements/CustomTabBarButton';
// import { AuthNavigator } from '@/features/auth';
import { NotificationNavigator } from '@/features/notification';
import { PassingNavigator } from '@/features/passing';
import { TravelBookletNavigator } from '@/features/travel_booklet';
import { TravelSpotNavigator } from '@/features/travel_spot';
import { UserNavigator } from '@/features/user';
import { HomeScreen } from '@/screens/HomeScreen';
import { TestScreen } from '@/screens/TestScreen';

import type { AppNavigationParamList } from './types';

// import { useAppNavigation } from './useAppNavigation';

const AppTab = createBottomTabNavigator<AppNavigationParamList>();

export const AppNavigator = () => {
  // const appNavigation = useAppNavigation();

  return (
    <AppTab.Navigator>
      <AppTab.Screen name="Test" component={TestScreen} />
      <AppTab.Screen name="Home" component={HomeScreen} />
      <AppTab.Screen name="TravelBooklet" component={TravelBookletNavigator} />
      <AppTab.Screen
        name="Passing"
        component={PassingNavigator}
        // スタイルを適用したカスタムボタンを使用できる
        // options={{
        //   tabBarButton: (props) => (
        //     <CustomTabBarButton {...props} onPress={() => appNavigation.navigate('Passing')} />
        //   ),
        // }}
      />
      <AppTab.Screen name="Notification" component={NotificationNavigator} />
      <AppTab.Screen name="User" component={UserNavigator} />
      <AppTab.Screen name="TravelSopt" component={TravelSpotNavigator} />
      {/* テスト用 */}
      {/* <AppTab.Screen name="Auth" component={AuthNavigator} /> */}
    </AppTab.Navigator>
  );
};
