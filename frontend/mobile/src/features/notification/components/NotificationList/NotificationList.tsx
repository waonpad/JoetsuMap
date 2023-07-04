import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { NotificationListItem } from '../NotificationListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { NotificationListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const NotificationList = ({}: NotificationListProps) => {
  const { notificationsQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={notificationsQuery.data?.pages.flatMap((page) => page.notifications.content)}
        renderItem={({ item }) => <NotificationListItem notification={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => notificationsQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
