import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { SearchModelCourseForm } from '../../components/SearchModelCourseForm';
import { SearchedModelCourseList } from '../../components/SearchedModelCourseList';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator';

import { styles } from './styles';
import { useUtils } from './useUtils';

export const SearchModelCourseScreen = () => {
  const route = useModelCourseRoute<'SearchModelCourse'>();

  const { handleSubmitSearch, searchParams } = useUtils();

  return (
    <View style={styles.container}>
      {/* <View style={{ height: 10 }} /> */}
      <View style={{ flex: 1, width: '100%' }}>
        <SearchModelCourseForm
          defaultValues={route.params?.searchModelCourseFormDefaultValues}
          onSubmitAction={handleSubmitSearch}
        />
      </View>
      <View style={{ flex: 8 }}>
        <Suspense>
          <SearchedModelCourseList searchParams={searchParams} />
        </Suspense>
      </View>
    </View>
  );
};
