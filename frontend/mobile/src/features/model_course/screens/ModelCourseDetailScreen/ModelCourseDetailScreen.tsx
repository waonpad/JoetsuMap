import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ModelCourseDetailScreenProps } from './types';

export const ModelCourseDetailScreen = ({}: ModelCourseDetailScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
