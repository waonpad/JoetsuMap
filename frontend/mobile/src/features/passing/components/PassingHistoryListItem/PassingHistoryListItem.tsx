import { View, Text } from 'react-native';

import { styles } from './styles';

import type { PassingHistoryListItemProps } from './types';

export const PassingHistoryListItem = ({ passing }: PassingHistoryListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{passing.passedUser.username}</Text>
    </View>
  );
};
