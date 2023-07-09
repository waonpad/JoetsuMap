import { IconButton } from 'native-base';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkModelCourseButtonProps } from './types';
export const BookmarkModelCourseButton = ({
  modelCourseId,
  size,
}: BookmarkModelCourseButtonProps) => {
  const { isBookmarked, handlePressBookmark } = useLogics({ modelCourseId });

  return (
    <View style={styles.container}>
      <IconButton
        icon={
          <Icon
            name={isBookmarked ? 'bookmark' : 'bookmark-o'}
            color={'orange'}
            size={size ?? 20}
          />
        }
        onPress={handlePressBookmark}
      />
    </View>
  );
};
