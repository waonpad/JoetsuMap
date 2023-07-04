import { View, Text } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelSpotDetailProps } from './types';

export const TravelSpotDetail = ({ travelSpotId }: TravelSpotDetailProps) => {
  const { travelSpotQuery } = useLogics({ travelSpotId });

  return (
    <View style={styles.container}>
      <Text>{travelSpotQuery.data?.travelSpot?.name}</Text>
    </View>
  );
};
