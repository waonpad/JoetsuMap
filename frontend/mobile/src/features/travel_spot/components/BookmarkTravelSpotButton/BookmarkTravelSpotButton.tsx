import { View, Button } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkTravelSpotButtonProps } from './types';

export const BookmarkTravelSpotButton = ({ travelSpotId }: BookmarkTravelSpotButtonProps) => {
  const { bookmarkTravelSpotMutation, handlePressBookmark } = useLogics({ travelSpotId });

  return (
    <View style={styles.container}>
      <Button
        // 最終的にアイコンに置き換える
        title={bookmarkTravelSpotMutation.isLoading ? '処理中' : 'ブックマーク'}
        onPress={handlePressBookmark}
      />
    </View>
  );
};
