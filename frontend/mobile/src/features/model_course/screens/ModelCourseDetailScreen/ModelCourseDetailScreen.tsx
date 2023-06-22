import { View } from 'react-native';

import { ModelCourseDetail } from '../../components/ModelCourseDetail';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator/useModelCourseRoute';

import { styles } from './styles';

export const ModelCourseDetailScreen = () => {
  const route = useModelCourseRoute<'ModelCourseDetail'>();

  return (
    <View style={styles.container}>
      <ModelCourseDetail modelCourseId={route.params.modelCourseId} />
    </View>
  );
};
