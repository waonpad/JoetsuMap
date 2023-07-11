import { FlatList, View } from 'react-native';

// import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

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
        style={{ width: '100%' }}
        data={myPassingsQuery.data?.passings ?? []}
        renderItem={({ item }) => <PassingHistoryListItem passing={item} />}
        keyExtractor={(item) => item.id.toString()}
        // onEndReached={() => myPassingsQuery.fetchNextPage()}
        // onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
