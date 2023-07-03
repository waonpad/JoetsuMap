import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { TravelBookletListItem } from '../TravelBookletListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { UserTravelBookletListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const UserTravelBookletList = ({ userId }: UserTravelBookletListProps) => {
  const { userTravelBookletsQuery } = useLogics({ userId });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={userTravelBookletsQuery.data?.pages.flatMap((page) => page.travelBooklets.content)}
        renderItem={({ item }) => <TravelBookletListItem travelBooklet={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // 余白
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => userTravelBookletsQuery.fetchNextPage()} // 下に到達したら次のページを読み込む
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD} // 画面の下からどれくらいの位置で読み込むか
      />
    </View>
  );
};
