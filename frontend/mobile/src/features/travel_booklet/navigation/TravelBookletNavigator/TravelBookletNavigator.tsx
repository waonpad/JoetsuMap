import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { BaseNavigationParamList } from '@/types';

import { CreateTravelBookletScreen } from '../../screens/CreateTravelBookletScreen';
import { TravelBookletDetailScreen } from '../../screens/TravelBookletDetailScreen';
import { TravelBookletHomeScreen } from '../../screens/TravelBookletHomeScreen';
import { UpdateTravelBookletScreen } from '../../screens/UpdateTravelBookletScreen';

import type { CreateTravelBookletScreenParams } from '../../screens/CreateTravelBookletScreen';
import type { TravelBookletDetailScreenParams } from '../../screens/TravelBookletDetailScreen';
import type { TravelBookletHomeScreenParams } from '../../screens/TravelBookletHomeScreen';
import type { UpdateTravelBookletScreenParams } from '../../screens/UpdateTravelBookletScreen';

export type TravelBookletNavigationParamList = {
  CreateTravelBooklet: CreateTravelBookletScreenParams;
  TravelBookletDetail: TravelBookletDetailScreenParams;
  TravelBookletHome: TravelBookletHomeScreenParams;
  UpdateTravelBooklet: UpdateTravelBookletScreenParams;
} & BaseNavigationParamList;

const TravelBookletStack = createNativeStackNavigator<TravelBookletNavigationParamList>();

export const TravelBookletNavigator = () => {
  return (
    <TravelBookletStack.Navigator>
      <TravelBookletStack.Screen name="TravelBookletHome" component={TravelBookletHomeScreen} />
      <TravelBookletStack.Screen name="CreateTravelBooklet" component={CreateTravelBookletScreen} />
      <TravelBookletStack.Screen name="TravelBookletDetail" component={TravelBookletDetailScreen} />
      <TravelBookletStack.Screen name="UpdateTravelBooklet" component={UpdateTravelBookletScreen} />
    </TravelBookletStack.Navigator>
  );
};
