import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { View, ActivityIndicator } from 'react-native';

import { BACK_LOCATION_TRACKING_TASK_NAME, IS_TUNNEL, LOCATION_TRACKING } from '@/constants';
import createCtx from '@/utils/createCtx';

import { secureStore } from './expo-secure-store';

import type { LocationObject } from 'expo-location';

const [createdUseLocationTracking, SetLocationTrackingProvider] =
  createCtx<ReturnType<typeof useLocationTrackingCtx>>();

export const LocationTrackingProvider = ({ children }: { children: React.ReactNode }) => {
  const locationTracking = useLocationTrackingCtx();

  // if (locationTracking.load) {
  // eslint-disable-next-line no-constant-condition
  if (false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <SetLocationTrackingProvider value={locationTracking}>{children}</SetLocationTrackingProvider>
    );
  }
};

export const useLocationTracking = createdUseLocationTracking;

// 位置情報の取得精度
// accuracy: Location.Accuracy.BestForNavigation

// 実行間隔
// timeInterval: xxx

TaskManager.defineTask(BACK_LOCATION_TRACKING_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data as { locations: LocationObject[] };
    const location = locations[0];
    if (location) {
      console.log('Location in background', location.coords);

      // await secureStore.setItemAsync(
      //   'location',
      //   JSON.stringify({
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //     datetime: new Date().toISOString(),
      //   }),
      // );

      // const token = await secureStore.getItemAsync('expoPushToken');

      // if (!token) {
      //   return;
      // }
      // const message = {
      //   to: token,
      //   sound: 'default',
      //   title: 'Original Title',
      //   body: 'And here is the body!',
      //   data: { someData: 'goes here' },
      // };

      // await fetch('https://exp.host/--/api/v2/push/send', {
      //   method: 'POST',
      //   headers: {
      //     Accept: 'application/json',
      //     'Accept-encoding': 'gzip, deflate',
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(message),
      // });
    }
  }
});

export const useLocationTrackingCtx = () => {
  const [foregroundSubscription, setForegroundSubscription] =
    useState<Location.LocationSubscription | null>(null);

  // 権限を要求する関数
  const requestPermissions = async () => {
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) {
      console.log('Foreground location permission granted');

      const background = await Location.requestBackgroundPermissionsAsync();
      if (background.granted) {
        console.log('Background location permission granted');
      }
    }
  };

  const startForegroundUpdate = async () => {
    // 権限の要求
    const { granted } = await Location.getForegroundPermissionsAsync();
    // 権限がない場合は処理を終了する
    if (!granted) {
      console.log('location tracking denied');
      return;
    }

    // 既にサブスクリプションがある場合は削除する
    foregroundSubscription?.remove();

    // 位置情報の取得処理を作成
    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
      },
      (location) => {
        console.log('Location in foreground', location.coords);
      },
    );

    // サブスクリプションに登録する
    setForegroundSubscription(subscription);
  };

  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();

    setForegroundSubscription(null);
  };

  const startBackgroundUpdate = async () => {
    // 権限の要求
    const { granted } = await Location.getBackgroundPermissionsAsync();
    // 権限がない場合は処理を終了する
    if (!granted) {
      console.log('location tracking denied');
      return;
    }

    const isTaskDefined = TaskManager.isTaskDefined(BACK_LOCATION_TRACKING_TASK_NAME);
    if (!isTaskDefined) {
      console.log('Task is not defined');
      return;
    }

    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACK_LOCATION_TRACKING_TASK_NAME,
    );
    if (hasStarted) {
      console.log('Already started');
      return;
    }

    await Location.startLocationUpdatesAsync(BACK_LOCATION_TRACKING_TASK_NAME, {
      accuracy: Location.Accuracy.BestForNavigation,
      // バックグラウンドで位置情報を取得していることを示すインジケーター
      showsBackgroundLocationIndicator: true,
      // バックグラウンドで位置情報を取得していることを示す通知
      foregroundService: {
        notificationTitle: 'Location',
        notificationBody: 'Location tracking in background',
        notificationColor: '#fff',
      },
    });
  };

  // バックグラウンドでの位置情報の取得を停止する関数
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACK_LOCATION_TRACKING_TASK_NAME,
    );
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACK_LOCATION_TRACKING_TASK_NAME);
      console.log('Location tracking stopped');
    }
  };

  useEffect(() => {
    if (IS_TUNNEL === 'false' && LOCATION_TRACKING === 'true') {
      (async () => {
        await requestPermissions();
        await startForegroundUpdate();
        await startBackgroundUpdate();
      })();
    }

    // バックグラウンドの位置情報の取得を停止する(UIを作るのが面倒なためここで簡易的に実装)
    // stopBackgroundUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    requestPermissions,
    startForegroundUpdate,
    stopForegroundUpdate,
    startBackgroundUpdate,
    stopBackgroundUpdate,
  };
};
