import { View } from 'react-native';

import { styles } from './styles';

import type { ModelCourseListItemProps } from './types';

export const ModelCourseListItem = ({ modelCourse }: ModelCourseListItemProps) => {
  return <View style={styles.container}>{modelCourse.title}</View>;
};
