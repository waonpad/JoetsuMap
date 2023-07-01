import { Dimensions, FlatList, Text, View } from 'react-native';

import { TravelBookletListItem } from '../TravelBookletListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { TravelBookletListProps } from './types';
import { useEffect } from 'react';

// eslint-disable-next-line no-empty-pattern
export const TravelBookletList = ({}: TravelBookletListProps) => {
  const { travelBookletsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <Text>旅行しおり一覧</Text>
      <FlatList
        style={{
          width: Dimensions.get('window').width,
        }}
        data={travelBookletsQuery.data?.pages.flatMap((page) => page.travelBooklets.content)}
        renderItem={({ item }) => <TravelBookletListItem travelBooklet={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => travelBookletsQuery.fetchNextPage()}
        onEndReachedThreshold={0}
      />
    </View>
  );
};
