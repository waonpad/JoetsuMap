import { View } from 'react-native';

import { CreateModelCourseForm } from '../../components/CreateModelCourseForm';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator/useModelCourseRoute';

import { styles } from './styles';

export const CreateModelCourseScreen = () => {
  const route = useModelCourseRoute<'CreateModelCourse'>();

  return (
    <View style={styles.container}>
      <CreateModelCourseForm defaultValues={route.params.createModelCourseFormDefaultValues} />
    </View>
  );
};
