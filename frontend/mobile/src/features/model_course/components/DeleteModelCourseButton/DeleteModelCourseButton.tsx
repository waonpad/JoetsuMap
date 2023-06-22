import { Button, View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { DeleteModelCourseButtonProps } from './types';

export const DeleteModelCourseButton = ({ modelCourseId }: DeleteModelCourseButtonProps) => {
  const { deleteModelCourseMutation, handlePressDelete } = useLogics({ modelCourseId });

  return (
    <View style={styles.container}>
      <Button
        title={deleteModelCourseMutation.isLoading ? '削除中' : '削除'}
        onPress={handlePressDelete}
      />
    </View>
  );
};
