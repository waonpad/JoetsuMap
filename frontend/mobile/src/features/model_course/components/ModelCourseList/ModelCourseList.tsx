import { Dimensions, FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { ModelCourseListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const ModelCourseList = ({}: ModelCourseListProps) => {
  const { modelCoursesQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: Dimensions.get('window').width }}
        data={modelCoursesQuery.data?.pages.flatMap((page) => page.modelCourses.content)}
        renderItem={({ item }) => <ModelCourseListItem modelCourse={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => modelCoursesQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
