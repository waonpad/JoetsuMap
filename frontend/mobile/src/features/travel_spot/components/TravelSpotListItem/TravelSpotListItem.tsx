import { Text } from 'native-base';
import { View } from 'react-native';

import { BookmarkTravelSpotButton } from '../BookmarkTravelSpotButton';

import { styles } from './styles';

import type { TravelSpotListItemProps } from './types';

export const TravelSpotListItem = ({ travelSpot }: TravelSpotListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{travelSpot.name}</Text>
      <BookmarkTravelSpotButton travelSpotId={travelSpot.id} />
    </View>
  );
};
