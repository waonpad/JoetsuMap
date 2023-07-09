import React from 'react';

import { AntDesign, Foundation, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { CustomTabBarButton } from '@/components/Elements/CustomTabBarButton';
// import { AuthNavigator } from '@/features/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ModelCourseNavigator } from '@/features/model_course';
import { NotificationNavigator } from '@/features/notification';
import { PassingNavigator } from '@/features/passing';
import { TravelBookletNavigator } from '@/features/travel_booklet';
// import { TravelSpotNavigator } from '@/features/travel_spot';
// import { UserNavigator } from '@/features/user';
import { HomeScreen } from '@/screens/HomeScreen';
import { TestScreen } from '@/screens/TestScreen';
import type { Screens } from '@/types';

import type { AppNavigationParamList } from './types';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

const AppTab = createBottomTabNavigator<AppNavigationParamList>();

export const AppNavigator = () => {
  const appScreens: Screens<AppNavigationParamList> = {
    // Auth: AuthNavigator,
    Test: TestScreen,
    Home: HomeScreen,
    ModelCourse: ModelCourseNavigator,
    Passing: PassingNavigator,
    TravelBooklet: TravelBookletNavigator,
    Notification: NotificationNavigator,
    // User: UserNavigator,
    // TravelSopt: TravelSpotNavigator,
  };

  const tabBarIconColor = '#333333';
  const tabBarFocusedIconColor = '#e6a3ad';
  const tabBarInActiveTintColor = '#e6a3ad';

  const appScreenOptions: {
    [key in keyof AppNavigationParamList]?: BottomTabNavigationOptions;
  } = {
    Home: {
      title: 'ホーム',
      tabBarIcon: ({ focused }) => (
        <AntDesign
          name="home"
          size={24}
          color={focused ? tabBarFocusedIconColor : tabBarIconColor}
        />
      ),
    },
    ModelCourse: {
      title: 'モデルコース',
      tabBarIcon: ({ focused }) => (
        <FontAwesome
          name="map-o"
          size={24}
          color={focused ? tabBarFocusedIconColor : tabBarIconColor}
        />
      ),
    },
    Passing: {
      title: 'すれ違い',
      tabBarIcon: ({ focused }) => (
        <Icon
          name="cellphone-marker"
          size={24}
          color={focused ? tabBarFocusedIconColor : tabBarIconColor}
        />
      ),
    },
    TravelBooklet: {
      title: '旅のしおり',
      tabBarIcon: ({ focused }) => (
        <SimpleLineIcons
          name="note"
          size={24}
          color={focused ? tabBarFocusedIconColor : tabBarIconColor}
        />
      ),
    },
    Notification: {
      title: 'お知らせ',
      tabBarIcon: ({ focused }) => (
        <Foundation
          name="megaphone"
          size={24}
          color={focused ? tabBarFocusedIconColor : tabBarIconColor}
        />
      ),
    },
  };

  return (
    <AppTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#e0ffff', height: 60, paddingBottom: 10, paddingTop: 10 },
        tabBarActiveTintColor: tabBarInActiveTintColor,
      }}>
      {Object.entries(appScreens).map(([name, component]) => (
        <AppTab.Screen
          key={name}
          name={name as keyof AppNavigationParamList}
          component={component}
          options={appScreenOptions[name as keyof AppNavigationParamList]}
        />
      ))}
    </AppTab.Navigator>
  );
};
