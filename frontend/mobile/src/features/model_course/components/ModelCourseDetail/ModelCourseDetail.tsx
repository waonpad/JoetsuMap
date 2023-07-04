import { View, Text } from 'react-native';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ModelCourseDetailProps } from './types';

export const ModelCourseDetail = ({ modelCourseId }: ModelCourseDetailProps) => {
  const { modelCourseQuery } = useLogics({ modelCourseId });

  return (
    <View style={styles.container}>
      <Text>{modelCourseQuery.data?.modelCourse?.title}</Text>
    </View>
  );
};
