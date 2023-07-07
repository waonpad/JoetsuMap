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
      <SearchModelCourseForm
        defaultValues={route.params?.searchModelCourseFormDefaultValues}
        onSubmitAction={handleSubmitSearch}
      />
      <Suspense>
        <SearchedModelCourseList searchParams={searchParams} />
      </Suspense>
    </View>
  );
};
