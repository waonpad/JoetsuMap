import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { SearchedModelCourseListProps } from './types';

export const SearchedModelCourseList = ({ searchParams }: SearchedModelCourseListProps) => {
  const { searchModelCoursesQuery } = useLogics({ searchParams });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={searchModelCoursesQuery.data?.pages.flatMap((page) => page.modelCourses.content)}
        renderItem={({ item }) => <ModelCourseListItem modelCourse={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => searchModelCoursesQuery.fetchNextPage()}
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD}
      />
    </View>
  );
};
