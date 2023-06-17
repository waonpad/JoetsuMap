import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { TravelSpotDetailScreen } from '../../screens/TravelSpotDetailScreen';
import { TravelSpotHomeScreen } from '../../screens/TravelSpotHomeScreen';

import type { TravelSpotDetailScreenParams } from '../../screens/TravelSpotDetailScreen';
import type { TravelSpotHomeScreenParams } from '../../screens/TravelSpotHomeScreen';

export type TravelSpotNavigationParamList = {
  TravelSpotDetail: TravelSpotDetailScreenParams;
  TravelSpotHome: TravelSpotHomeScreenParams;
} & BaseNavigationParamList;

const TravelSpotStack = createNativeStackNavigator<TravelSpotNavigationParamList>();

export const TravelSpotNavigator = () => {
  return (
    <TravelSpotStack.Navigator>
      <TravelSpotStack.Screen name="TravelSpotHome" component={TravelSpotHomeScreen} />
      <TravelSpotStack.Screen name="TravelSpotDetail" component={TravelSpotDetailScreen} />
    </TravelSpotStack.Navigator>
  );
};
