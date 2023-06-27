import { useState, useEffect } from 'react';

import { Image } from 'expo-image';
import { View } from 'native-base';
import { ScrollView, Button, Text } from 'react-native';

import { Map } from '@/components/Map';
import { APP_NAME, IMAGE_SOURCE_BINARY } from '@/constants';
// import { ModelCourseList } from '@/features/model_course/components/ModelCourseList';
import type { TravelSpot } from '@/features/travel_spot';
import { TravelSpotCard } from '@/features/travel_spot/components/TravelSpotCard';
import { TravelSpotMapMarker } from '@/features/travel_spot/components/TravelSpotMapMarker';
import { useAuth } from '@/lib/auth';
import { secureStore } from '@/lib/expo-secure-store';
import { useNotification } from '@/lib/notification';
import { useAppNavigation } from '@/navigation/AppNavigator';
import { API_URL } from '@/utils/compute';

import { styles } from './styles';

/**
 * テスト用にいろいろ配置している。実際にはホーム画面
 */
export const HomeScreen = () => {
  const auth = useAuth();

  const appNavigation = useAppNavigation();

  const notification = useNotification();

  const [location, setLocation] = useState<any>();

  const [displayTravelSpot, setDisplayTravelSpot] = useState<TravelSpot>();

  useEffect(() => {
    const getLocation = async () => {
      const location = await secureStore.getItemAsync('location');
      if (location) {
        setLocation(JSON.parse(location));
      }
    };
    getLocation();
  }, []);

  const dummyTravelSpot: TravelSpot = {
    id: 1,
    name: 'test',
    address: 'test',
    tel: 'test',
    type: 'FUN',
    photo: 'test',
    coords: {
      lat: 37.14804525484053,
      lng: 138.23628563899265,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <ScrollView style={styles.container}>
      <Text>{JSON.stringify(auth.user)}</Text>
      {/* https://docs.expo.dev/versions/latest/sdk/image/ */}
      {/* <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: `${API_URL}${IMAGE_SOURCE_BINARY}?imagePath=${auth.user?.icon}`,
          // headers: { Authorization: `Bearer ${auth.token}` }, // 画像リソースへのアクセスは認可不要に
        }}
      /> */}
      <Text>{APP_NAME}</Text>
      <Text>{JSON.stringify(location)}</Text>
      <Button
        title="ロードユーザー"
        onPress={() => {
          auth.loadUser();
        }}
      />
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
      {/* <Map /> */}
      <View style={{ flex: 1, position: 'relative' }}>
        <Map>
          <TravelSpotMapMarker
            travelSpot={dummyTravelSpot}
            coordinate={{
              latitude: dummyTravelSpot.coords.lat,
              longitude: dummyTravelSpot.coords.lng,
            }}
            onPress={() => {
              console.log('onPress');
              setDisplayTravelSpot(dummyTravelSpot);
            }}
          />
        </Map>
        {displayTravelSpot && (
          // absoluteで中心に表示
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{ translateX: -50 }, { translateY: -50 }],
            }}>
            <TravelSpotCard
              travelSpot={displayTravelSpot}
              handleClose={() => setDisplayTravelSpot(undefined)}
            />
          </View>
        )}
      </View>
      {/* <ModelCourseList /> */}
    </ScrollView>
  );
};
