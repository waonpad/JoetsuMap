import { FlatList, View } from 'react-native';

import { DEFAULT_ON_END_REACHED_THRESHOLD } from '@/constants';

import { ModelCourseListItem } from '../ModelCourseListItem';

import { styles } from './styles';
import { useLogics } from './useLogics';

import type { UserModelCourseListProps } from './types';

// eslint-disable-next-line no-empty-pattern
export const UserModelCourseList = ({ userId }: UserModelCourseListProps) => {
  const { userModelCoursesQuery } = useLogics({ userId });

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%' }}
        data={userModelCoursesQuery.data?.pages.flatMap((page) => page.modelCourses.content)}
        renderItem={({ item }) => <ModelCourseListItem modelCourse={item} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />} // 余白
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => userModelCoursesQuery.fetchNextPage()} // 下に到達したら次のページを読み込む
        onEndReachedThreshold={DEFAULT_ON_END_REACHED_THRESHOLD} // 画面の下からどれくらいの位置で読み込むか
      />
    </View>
  );
};
