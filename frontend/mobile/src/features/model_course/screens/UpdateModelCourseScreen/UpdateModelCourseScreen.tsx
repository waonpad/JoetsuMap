import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { UpdateModelCourseForm } from '../../components/UpdateModelCourseForm';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator/useModelCourseRoute';

import { styles } from './styles';

export const UpdateModelCourseScreen = () => {
  const route = useModelCourseRoute<'UpdateModelCourse'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <UpdateModelCourseForm modelCourseId={route.params.modelCourseId} />
      </Suspense>
    </View>
  );
};
