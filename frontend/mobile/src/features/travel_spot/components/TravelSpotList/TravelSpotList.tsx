import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { TravelSpotListItem } from '../TravelSpotListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelSpotListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const TravelSpotList = ({}: TravelSpotListProps) => {
  const { travelSpotsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={travelSpotsQuery.data?.pages.flatMap((page) => page.travelSpots.content)}
        renderItem={({ item }) => <TravelSpotListItem travelSpot={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => travelSpotsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
