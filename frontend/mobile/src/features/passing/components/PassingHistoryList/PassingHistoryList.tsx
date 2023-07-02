import { Dimensions, FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { PassingHistoryListItem } from '../PassingHistoryListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { PassingHistoryListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const PassingHistoryList = ({}: PassingHistoryListProps) => {
  const { myPassingsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: Dimensions.get('window').width }}
        data={myPassingsQuery.data?.pages.flatMap((page) => page.passings.content)}
        renderItem={({ item }) => <PassingHistoryListItem passing={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => myPassingsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
