import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ModelCourseHomeScreenProps } from './types';

export const ModelCourseHomeScreen = ({}: ModelCourseHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
