import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ModelCourseListItemProps } from './types';

export const ModelCourseListItem = ({ modelCourse }: ModelCourseListItemProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
