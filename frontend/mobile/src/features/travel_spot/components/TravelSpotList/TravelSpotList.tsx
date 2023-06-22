import { View } from 'react-native';

import { TravelSpotListItem } from '../TravelSpotListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelSpotListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const TravelSpotList = ({}: TravelSpotListProps) => {
  const { travelSpotsQuery } = useLogics();

  return (
    <View style={styles.container}>
      {travelSpotsQuery.data?.travelSpots.map((travelSpot) => {
        return <TravelSpotListItem key={travelSpot.id} travelSpot={travelSpot} />;
      })}
    </View>
  );
};
