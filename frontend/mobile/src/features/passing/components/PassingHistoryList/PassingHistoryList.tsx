import { View } from 'react-native';

import { PassingHistoryListItem } from '../PassingHistoryListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { PassingHistoryListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const PassingHistoryList = ({}: PassingHistoryListProps) => {
  const { myPassingsQuery } = useLogics();

  return (
    <View style={styles.container}>
      {myPassingsQuery.data?.passings.map((passing) => {
        return <PassingHistoryListItem key={passing.id} passing={passing} />;
      })}
    </View>
  );
};
