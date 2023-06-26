import { Image } from 'expo-image';
import { View, Text, Button } from 'react-native';

import { IMAGE_SOURCE_BINARY } from '@/constants';
import { API_URL } from '@/utils/compute';

import { BookmarkTravelSpotButton } from '../BookmarkTravelSpotButton';

import { styles } from './styles';

import type { TravelSpotCardProps } from './types';

/**
 * マップ上のマーカーをタップしたときに表示されるカード
 */
export const TravelSpotCard = ({ travelSpot, handleClose }: TravelSpotCardProps) => {
  return (
    <View style={styles.container}>
      {/* <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri: `${API_URL}${IMAGE_SOURCE_BINARY}?imagePath=${travelSpot.photo}`,
        }}
      /> */}
      <Text>{travelSpot.name}</Text>
      <Text>{travelSpot.type}</Text>
      <BookmarkTravelSpotButton travelSpotId={travelSpot.id} />
      <Button title="閉じる" onPress={handleClose} />
    </View>
  );
};
