import { View } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ModelCourseDetailProps } from './types';

export const ModelCourseDetail = ({ modelCourseId }: ModelCourseDetailProps) => {
  const { modelCourseQuery } = useLogics({ modelCourseId });

  return <View style={styles.container}>{modelCourseQuery.data?.modelCourse?.title}</View>;
};
