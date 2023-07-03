import { Button, View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ReadNotificationButtonProps } from './types';

export const ReadNotificationButton = ({ notificationId }: ReadNotificationButtonProps) => {
  const { readNotificationMutation, handlePressRead } = useLogics({ notificationId });

  return (
    <View style={styles.container}>
      <Button
        title={readNotificationMutation.isLoading ? '処理中...' : '既読にする'}
        onPress={handlePressRead}
      />
    </View>
  );
};
