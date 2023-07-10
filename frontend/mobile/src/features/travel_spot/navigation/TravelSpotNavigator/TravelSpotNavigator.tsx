import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import { TravelSpotHomeScreen } from '../../screens/TravelSpotHomeScreen';
import { TypedTravelSpotScreen } from '../../screens/TypedTravelSpotScreen';

import type { TravelSpotNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const TravelSpotStack = createNativeStackNavigator<TravelSpotNavigationParamList>();

const travelSpotScreens: Screens<TravelSpotNavigationParamList> = {
  TravelSpotHome: TravelSpotHomeScreen,
  TypedTravelSpot: TypedTravelSpotScreen,
  ...commonScreens,
};

const travelSpotScreenOptions: {
  [key in keyof TravelSpotNavigationParamList]?: NativeStackNavigationOptions;
} = {
  TravelSpotHome: {
    title: '観光地',
  },
  TypedTravelSpot: {
    title: '観光地絞り込み',
  },
  ...commonScreenStackOptions,
};

export const TravelSpotNavigator = () => {
  return (
    <TravelSpotStack.Navigator screenOptions={{ headerStyle: commonHeaderStyle }}>
      {Object.entries({
        ...travelSpotScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <TravelSpotStack.Screen
          key={name}
          name={name as keyof TravelSpotNavigationParamList}
          component={component}
          options={travelSpotScreenOptions[name as keyof TravelSpotNavigationParamList]}
        />
      ))}
    </TravelSpotStack.Navigator>
  );
};
