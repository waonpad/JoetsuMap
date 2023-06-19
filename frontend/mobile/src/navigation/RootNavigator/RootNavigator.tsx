import React, { useEffect } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { IS_TUNNEL, LOCATION_TRACKING } from '@/constants';
import { AuthNavigator } from '@/features/auth';
import { useLocationTracking } from '@/features/tracked_location';
import type { BaseNavigationParamList } from '@/types';

import { AppNavigator } from '../AppNavigator';

export type RootNavigationParamList = {
  Auth: undefined;
  App: undefined;
} & BaseNavigationParamList;

const RootStack = createNativeStackNavigator<RootNavigationParamList>();

export const RootNavigator = () => {
  const locationTracking = useLocationTracking();

  const startLocationTracking = () => {
    locationTracking.requestPermissions();

    locationTracking.startForegroundUpdate();
    locationTracking.startBackgroundUpdate();
  };

  useEffect(() => {
    if (IS_TUNNEL === 'false' && LOCATION_TRACKING === 'true') {
      startLocationTracking();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RootStack.Navigator initialRouteName="App">
      <RootStack.Screen name="Auth" component={AuthNavigator} />
      <RootStack.Screen name="App" component={AppNavigator} />
    </RootStack.Navigator>
  );
};
