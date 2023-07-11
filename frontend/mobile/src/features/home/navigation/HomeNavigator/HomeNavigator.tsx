import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@/features/home/screens/HomeScreen';
import { TravelSpotHomeScreen } from '@/features/travel_spot/screens/TravelSpotHomeScreen';
import { TypedTravelSpotScreen } from '@/features/travel_spot/screens/TypedTravelSpotScreen';
import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import type { HomeNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const HomeStack = createNativeStackNavigator<HomeNavigationParamList>();

export const HomeNavigator = () => {
  const homeScreens: Screens<HomeNavigationParamList> = {
    HomeHome: HomeScreen,
    TravelSpotHome: TravelSpotHomeScreen,
    TypedTravelSpot: TypedTravelSpotScreen,
    ...commonScreens,
  };

  const homeScreenOptions: {
    [key in keyof HomeNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    HomeHome: {
      title: 'マップ',
    },
    TravelSpotHome: {
      title: '観光地',
    },
    TypedTravelSpot: {
      title: '観光地絞り込み',
    },
    ...commonScreenStackOptions,
  };

  return (
    <HomeStack.Navigator screenOptions={{ headerStyle: commonHeaderStyle }}>
      {Object.entries(homeScreens).map(([name, component]) => (
        <HomeStack.Screen
          key={name}
          name={name as keyof HomeNavigationParamList}
          component={component}
          options={homeScreenOptions[name as keyof HomeNavigationParamList]}
        />
      ))}
    </HomeStack.Navigator>
  );
};
