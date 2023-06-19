import { View } from 'react-native';

import { Map } from '@/components/Map';
import { ModelCourseList } from '@/features/model_course/components/ModelCourseList';

import { styles } from './styles';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Map />
      <ModelCourseList />
    </View>
  );
};
