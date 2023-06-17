import { Button, View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { DeleteTravelBookletButtonProps } from './types';

export const DeleteTravelBookletButton = ({ travelBookletId }: DeleteTravelBookletButtonProps) => {
  const { deleteTravelBookletQuery, handlePressDelete } = useLogics({ travelBookletId });

  return (
    <View style={styles.container}>
      <Button
        title={deleteTravelBookletQuery.isLoading ? '削除中' : '削除'}
        onPress={handlePressDelete}
      />
    </View>
  );
};
