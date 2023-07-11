import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { TravelSpotListItem } from '../TravelSpotListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TypedTravelSpotListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const TypedTravelSpotList = ({ travelSpotType }: TypedTravelSpotListProps) => {
  const { typedTravelSpotsQuery } = useLogics({ travelSpotType });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={typedTravelSpotsQuery.data?.pages.flatMap((page) => page.travelSpots.content)}
        renderItem={({ item }) => <TravelSpotListItem travelSpot={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // 余白
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => typedTravelSpotsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
