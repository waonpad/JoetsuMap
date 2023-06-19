import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';

import { BACK_LOCATION_TRACKING_TASK_NAME } from '@/constants';

import { useLocationTrakingTaskStore } from '../stores/useLocationTrackingTaskStore';
import { backgroundLocationTrackingTaskDefinition } from '../tasks/locationTraskingTask';

import type { LocationTrackingTaskStore } from '../stores/useLocationTrackingTaskStore';

// 位置情報の取得精度
// accuracy: Location.Accuracy.BestForNavigation

// 実行間隔
// timeInterval: xxx

// 同じファイルでdefineTaskを実行しないといけないようだ
backgroundLocationTrackingTaskDefinition();

export const useLocationTracking = () => {
  const foregroundSubscription = useLocationTrakingTaskStore(
    (state: LocationTrackingTaskStore) => state.foregroundSubscription,
  );

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
    useLocationTrakingTaskStore.setState({ foregroundSubscription: subscription });
  };

  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove();

    useLocationTrakingTaskStore.setState({ foregroundSubscription: null });
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

  return {
    requestPermissions,
    startForegroundUpdate,
    stopForegroundUpdate,
    startBackgroundUpdate,
    stopBackgroundUpdate,
  };
};
