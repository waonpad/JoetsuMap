import { Button } from 'native-base';
import { Dimensions, View } from 'react-native';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const route = useModelCourseRoute<'ModelCourseHome'>();

  const { handlePressNavigateToCreateModelCourse, handlePressNavigateToSearchModelCourse } =
    useUtils();

  return (
    <View style={styles.container}>
      <View style={{ height: 10 }} />
      <Button
        variant={'outline'}
        _text={{ color: 'text.800', bold: true }}
        bg={'white'}
        width={'100%'}
        onPress={handlePressNavigateToCreateModelCourse}
        marginX={Dimensions.get('window').width * 0.025}>
        {NAVIGATE_TO_CREATE_MODEL_COURSE_BUTTON_LABEL}
      </Button>
      <View style={{ height: 10 }} />
      <Button
        variant={'outline'}
        _text={{ color: 'text.800', bold: true }}
        bg={'white'}
        width={'100%'}
        onPress={handlePressNavigateToSearchModelCourse}
        marginX={Dimensions.get('window').width * 0.025}>
        {NAVIGATE_TO_SEARCH_MODEL_COURSE_BUTTON_LABEL}
      </Button>
      <View style={{ height: 10 }} />
      <Suspense>
        <ModelCourseList />
      </Suspense>
    </View>
  );
};
