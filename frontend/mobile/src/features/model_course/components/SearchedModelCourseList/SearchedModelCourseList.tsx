import { View } from 'react-native';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { SearchedModelCourseListProps } from './types';

export const SearchedModelCourseList = ({ searchParams }: SearchedModelCourseListProps) => {
  const { searchModelCoursesQuery } = useLogics({ searchParams });

  return (
    <View style={styles.container}>
      {searchModelCoursesQuery.data?.modelCourses.map((modelCourse) => {
        return <ModelCourseListItem key={modelCourse.id} modelCourse={modelCourse} />;
      })}
    </View>
  );
};
