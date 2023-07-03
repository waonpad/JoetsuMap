import { Button, View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ReadAllNotificationButtonProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const ReadAllNotificationButton = ({}: ReadAllNotificationButtonProps) => {
  const { readAllNotificationMutation, handlePressReadAll } = useLogics();

  return (
    <View style={styles.container}>
      <Button
        title={readAllNotificationMutation.isLoading ? '処理中...' : '全て既読にする'}
        onPress={handlePressReadAll}
      />
    </View>
  );
};
