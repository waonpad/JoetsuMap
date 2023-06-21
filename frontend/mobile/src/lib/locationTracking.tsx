import { useEffect, useState } from 'react';

import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { View, ActivityIndicator } from 'react-native';

import { BACK_LOCATION_TRACKING_TASK_NAME, IS_TUNNEL, LOCATION_TRACKING } from '@/constants';
import { createTrackedLocation } from '@/features/tracked_location/api/createTrackedLocation';
import createCtx from '@/utils/createCtx';

import { useAuth } from './auth';

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

      // サーバーに位置情報を送信する
      createTrackedLocation({
        data: {
          coords: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        },
      });
    }
  }
});

export const useLocationTrackingCtx = () => {
  const auth = useAuth();

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
        timeInterval: 30000,
      },
      (location) => {
        console.log('Location in foreground', location.coords);

        // サーバーに位置情報を送信する
        createTrackedLocation({
          data: {
            coords: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
          },
        });
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
      timeInterval: 30000,
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

  // どちらかの権限を取得して位置情報の取得を開始する関数
  const startLocationTracking = async () => {
    // バックグラウンド権限取得
    const background = await Location.getBackgroundPermissionsAsync();
    if (background.granted) {
      await startBackgroundUpdate();
      return;
    }

    // フォアグラウンド権限取得
    const foreground = await Location.requestForegroundPermissionsAsync();
    if (foreground.granted) {
      await startForegroundUpdate();
      return;
    }
  };

  // 位置情報の取得を停止する関数
  const stopLocationTracking = () => {
    stopForegroundUpdate();
    stopBackgroundUpdate();
  };

  useEffect(() => {
    if (!auth.user?.id) {
      stopLocationTracking();
      return;
    }

    if (IS_TUNNEL === 'false' && LOCATION_TRACKING === 'true') {
      (async () => {
        await requestPermissions();
        await startLocationTracking();
      })();
    }

    // バックグラウンドの位置情報の取得を停止する(UIを作るのが面倒なためここで簡易的に実装)
    // stopBackgroundUpdate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.id]);

  return {
    requestPermissions,
    startForegroundUpdate,
    stopForegroundUpdate,
    startBackgroundUpdate,
    stopBackgroundUpdate,
    startLocationTracking,
    stopLocationTracking,
  };
};
