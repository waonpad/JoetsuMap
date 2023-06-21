import { useState, useEffect } from 'react';

import { View, Button, Text } from 'react-native';

import { Map } from '@/components/Map';
import { APP_NAME, APP_ENV, API_MOCK, API_URL_DEV_IOS } from '@/constants';
import { ModelCourseList } from '@/features/model_course/components/ModelCourseList';
import { secureStore } from '@/lib/expo-secure-store';
import { useNotification } from '@/lib/notification';

import { styles } from './styles';

export const HomeScreen = () => {
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
      <Text>{APP_NAME}</Text>
      <Text>{APP_ENV}</Text>
      <Text>{API_MOCK}</Text>
      <Text>{API_URL_DEV_IOS}</Text>
      <Text>{JSON.stringify(location)}</Text>
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
