import { View, Text } from 'react-native';

import { styles } from './styles';

import type { ModelCourseListItemProps } from './types';

export const ModelCourseListItem = ({ modelCourse }: ModelCourseListItemProps) => {
  return (
    <View style={styles.container}>
      <Text>{modelCourse.title}</Text>
    </View>
  );
};
