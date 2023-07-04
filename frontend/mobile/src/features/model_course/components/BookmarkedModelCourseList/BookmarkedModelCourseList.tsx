import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { BookmarkedModelCourseListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const BookmarkedModelCourseList = ({}: BookmarkedModelCourseListProps) => {
  const { bookmarkedModelCoursesQuery } = useLogics();

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={bookmarkedModelCoursesQuery.data?.pages.flatMap((page) => page.modelCourses.content)}
        renderItem={({ item }) => <ModelCourseListItem modelCourse={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => bookmarkedModelCoursesQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
