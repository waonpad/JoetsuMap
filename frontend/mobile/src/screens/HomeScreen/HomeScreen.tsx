import { useState, useEffect } from 'react';

import { Image } from 'expo-image';
import { View, Button, Text } from 'react-native';

// import { Map } from '@/components/Map';
import { APP_NAME, IMAGE_SOURCE_BINARY } from '@/constants';
// import { ModelCourseList } from '@/features/model_course/components/ModelCourseList';
import { useAuth } from '@/lib/auth';
import { secureStore } from '@/lib/expo-secure-store';
import { useNotification } from '@/lib/notification';
import { useAppNavigation } from '@/navigation/AppNavigator';
import { API_URL } from '@/utils/compute';

import { styles } from './styles';

export const HomeScreen = () => {
  const auth = useAuth();

  const appNavigation = useAppNavigation();

  const notification = useNotification();

  const [location, setLocation] = useState<any>();

  useEffect(() => {
    const getLocation = async () => {
      const location = await secureStore.getItemAsync('location');
      if (location) {
        setLocation(JSON.parse(location));
      }
    };
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(auth.user)}</Text>
      {/* https://docs.expo.dev/versions/latest/sdk/image/ */}
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: `${API_URL}${IMAGE_SOURCE_BINARY}?imagePath=${auth.user?.icon}`,
          headers: { Authorization: `Bearer ${auth.token}` },
        }}
      />
      <Text>{APP_NAME}</Text>
      <Text>{JSON.stringify(location)}</Text>
      <Button
        title="登録画面へ(テスト用)"
        onPress={() => {
          appNavigation.navigate('Auth', { screen: 'Register' } as any);
        }}
      />
      <Button
        title="ログイン画面へ(テスト用)"
        onPress={() => {
          appNavigation.navigate('Auth', { screen: 'Login' } as any);
        }}
      />
      <Button
        title="ログアウト"
        onPress={() => {
          auth.logout();
        }}
      />
      <Button
        title="Send Notification"
        onPress={() => {
          notification.sendPushNotification();
        }}
      />
      {/* <Map />
      <ModelCourseList /> */}
    </View>
  );
};
