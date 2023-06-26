import { View, Button } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkModelCourseButtonProps } from './types';

export const BookmarkModelCourseButton = ({ modelCourseId }: BookmarkModelCourseButtonProps) => {
  const { bookmarkModelCourseMutation, handlePressBookmark } = useLogics({ modelCourseId });

  return (
    <View style={styles.container}>
      <Button
        // 最終的にアイコンに置き換える
        title={bookmarkModelCourseMutation.isLoading ? '処理中' : 'ブックマーク'}
        onPress={handlePressBookmark}
      />
    </View>
  );
};
