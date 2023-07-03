import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { TravelSpotHomeScreen } from '../../screens/TravelSpotHomeScreen';

import type { TravelSpotNavigationParamList } from './types';

const TravelSpotStack = createNativeStackNavigator<TravelSpotNavigationParamList>();

const travelSpotScreens: Screens<TravelSpotNavigationParamList> = {
  TravelSpotHome: TravelSpotHomeScreen,
};

export const TravelSpotNavigator = () => {
  return (
    <TravelSpotStack.Navigator screenOptions={{ headerShown: false }}>
      {Object.entries({
        ...travelSpotScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <TravelSpotStack.Screen
          key={name}
          name={name as keyof TravelSpotNavigationParamList}
          component={component}
        />
      ))}
    </TravelSpotStack.Navigator>
  );
};
