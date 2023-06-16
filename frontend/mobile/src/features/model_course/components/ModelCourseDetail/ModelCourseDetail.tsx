import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { ModelCourseDetailProps } from './types';

export const ModelCourseDetail = ({ modelCourseId }: ModelCourseDetailProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
