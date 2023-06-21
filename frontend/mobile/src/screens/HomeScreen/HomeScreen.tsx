import { useState, useEffect } from 'react';

import { View, Button, Text } from 'react-native';

// import { Map } from '@/components/Map';
import { APP_NAME } from '@/constants';
// import { ModelCourseList } from '@/features/model_course/components/ModelCourseList';
import { useAuth } from '@/lib/auth';
import { secureStore } from '@/lib/expo-secure-store';
import { useNotification } from '@/lib/notification';

import { styles } from './styles';

export const HomeScreen = () => {
  const auth = useAuth();

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
      <Text>{APP_NAME}</Text>
      <Text>{JSON.stringify(location)}</Text>
      <Button
        title="テスト登録"
        onPress={() => {
          auth.registerAsTestUser();
        }}
      />
      <Button
        title="テストログイン"
        onPress={() => {
          auth.loginAsTestUser();
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
