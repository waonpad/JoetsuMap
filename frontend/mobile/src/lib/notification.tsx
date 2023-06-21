import { useRef, useEffect } from 'react';

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { View, ActivityIndicator } from 'react-native';

import { saveNotificationToken } from '@/features/notification/api/saveNotificationToken';
import { sendNotification } from '@/features/notification/api/sendNotification';
import createCtx from '@/utils/createCtx';

import { useAuth } from './auth';

const [createdUseNotification, SetNotificationProvider] =
  createCtx<ReturnType<typeof useNotificationCtx>>();

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const notification = useNotificationCtx();

  // if (notification.load) {
  // eslint-disable-next-line no-constant-condition
  if (false) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return <SetNotificationProvider value={notification}>{children}</SetNotificationProvider>;
  }
};

export const useNotification = createdUseNotification;

// ISSUE: ログアウトしても通知が届く
// 参考 https://github.com/expo/expo/issues/10684

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// https://blog.sbworks.jp/2021/04/01/reactnative%EF%BC%86expo%E3%81%AB%E3%82%88%E3%82%8Bpush%E9%80%9A%E7%9F%A5%EF%BC%88ios%EF%BC%89%E3%81%AE%E5%AE%9F%E8%A3%85/
export const useNotificationCtx = () => {
  const auth = useAuth();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async () => {
    if (Device.isDevice) {
      //①このアプリからのPush通知の許可を取得
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        //②初回起動時は許可ダイアログを出してユーザからPush通知の許可を取得
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //許可がない場合
        alert('Failed to get push token for push notification!');
        return;
      }
      //③通知用トークンの取得
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);

      //④サーバにトークンを送信
      // 毎回送信するのは冗長かも？
      await saveNotificationToken({ token });

      return token;
    } else {
      //実機以外の場合
      alert('Must use physical device for Push Notifications');
      return;
    }
  };

  const registerNotificationListener = () => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      // フォアグラウンドで通知を受け取った時の処理
      console.log('notificationListener');
      console.log(notification);
    });
  };

  const registerResponseListener = () => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      // 通知をタップした時の処理
      console.log('responseListener');
      console.log(response);
    });
  };

  const removeNotificationSubscription = () => {
    if (notificationListener.current) {
      Notifications.removeNotificationSubscription(notificationListener.current);
      console.log('removeNotificationSubscription');
    }
  };

  const removeResponseSubscription = () => {
    if (responseListener.current) {
      Notifications.removeNotificationSubscription(responseListener.current);
      console.log('removeResponseSubscription');
    }
  };

  // テスト用 /////////////////////////////////////////////////////////////////////////
  const sendPushNotification = async () => {
    const token = await registerForPushNotificationsAsync();

    if (token) {
      await sendNotification({ token });
    }
  };

  useEffect(() => {
    if (!auth.user?.id) {
      return;
    }

    (async () => {
      const token = await registerForPushNotificationsAsync();

      if (token) {
        registerNotificationListener();
        registerResponseListener();
      }
    })();

    return () => {
      removeNotificationSubscription();
      removeResponseSubscription();
    };
  }, [auth.user?.id]);

  return {
    registerForPushNotificationsAsync,
    sendPushNotification,
  };
};
