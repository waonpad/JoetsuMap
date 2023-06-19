import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { TravelSpotDetailScreen } from '../../screens/TravelSpotDetailScreen';
import { TravelSpotHomeScreen } from '../../screens/TravelSpotHomeScreen';

import type { TravelSpotDetailScreenParams } from '../../screens/TravelSpotDetailScreen/types';
import type { TravelSpotHomeScreenParams } from '../../screens/TravelSpotHomeScreen/types';

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
