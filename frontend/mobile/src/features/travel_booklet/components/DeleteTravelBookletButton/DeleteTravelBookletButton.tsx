import { Button } from 'native-base';
import { View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { DeleteTravelBookletButtonProps } from './types';

export const DeleteTravelBookletButton = ({ travelBookletId }: DeleteTravelBookletButtonProps) => {
  const { deleteTravelBookletMutation, handlePressDelete } = useLogics({ travelBookletId });

  return (
    <View style={styles.container}>
      <Button size={'sm'} onPress={handlePressDelete}>
        {deleteTravelBookletMutation.isLoading ? '削除中' : '削除'}
      </Button>
    </View>
  );
};
