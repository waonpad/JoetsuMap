import { View } from 'react-native';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ModelCourseListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const ModelCourseList = ({}: ModelCourseListProps) => {
  const { modelCoursesQuery } = useLogics();

  return (
    <View style={styles.container}>
      {modelCoursesQuery.data?.modelCourses.map((modelCourse) => {
        return <ModelCourseListItem key={modelCourse.id} modelCourse={modelCourse} />;
      })}
    </View>
  );
};
