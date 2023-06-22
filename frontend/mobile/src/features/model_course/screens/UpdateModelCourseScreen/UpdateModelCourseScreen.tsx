import { View } from 'react-native';

import { UpdateModelCourseForm } from '../../components/UpdateModelCourseForm';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator/useModelCourseRoute';

import { styles } from './styles';

export const UpdateModelCourseScreen = () => {
  const route = useModelCourseRoute<'UpdateModelCourse'>();

  return (
    <View style={styles.container}>
      <UpdateModelCourseForm modelCourseId={route.params.modelCourseId} />
    </View>
  );
};
