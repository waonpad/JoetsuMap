import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { ModelCourseDetail } from '../../components/ModelCourseDetail';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator/useModelCourseRoute';

import { styles } from './styles';

export const ModelCourseDetailScreen = () => {
  const route = useModelCourseRoute<'ModelCourseDetail'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <ModelCourseDetail modelCourseId={route.params.modelCourseId} />
      </Suspense>
    </View>
  );
};
