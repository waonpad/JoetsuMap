import { Button } from 'native-base';
import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { ModelCourseList } from '../../components/ModelCourseList';
import { useModelCourseRoute } from '../../navigation/ModelCourseNavigator';

import {
  NAVIGATE_TO_CREATE_MODEL_COURSE_BUTTON_LABEL,
  NAVIGATE_TO_SEARCH_MODEL_COURSE_BUTTON_LABEL,
} from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

export const ModelCourseHomeScreen = () => {
  const route = useModelCourseRoute<'ModelCourseHome'>();

  const { handlePressNavigateToCreateModelCourse, handlePressNavigateToSearchModelCourse } =
    useUtils();

  return (
    <View style={styles.container}>
      <Button onPress={handlePressNavigateToCreateModelCourse}>
        {NAVIGATE_TO_CREATE_MODEL_COURSE_BUTTON_LABEL}
      </Button>
      <Button onPress={handlePressNavigateToSearchModelCourse}>
        {NAVIGATE_TO_SEARCH_MODEL_COURSE_BUTTON_LABEL}
      </Button>
      <Suspense>
        <ModelCourseList />
      </Suspense>
    </View>
  );
};
