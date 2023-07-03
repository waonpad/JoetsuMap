import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { TravelSpotListItem } from '../TravelSpotListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkedTravelSpotListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const BookmarkedTravelSpotList = ({}: BookmarkedTravelSpotListProps) => {
  const { bookmarkedTravelSpotsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={bookmarkedTravelSpotsQuery.data?.pages.flatMap((page) => page.travelSpots.content)}
        renderItem={({ item }) => <TravelSpotListItem travelSpot={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => bookmarkedTravelSpotsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
