import { View, Text } from 'react-native';

import { styles } from './styles';

import type { TravelSpotListItemProps } from './types';

export const TravelSpotListItem = ({ travelSpot }: TravelSpotListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{travelSpot.name}</Text>
    </View>
  );
};
