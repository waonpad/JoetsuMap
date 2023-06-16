import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { UpdateModelCourseScreenProps } from './types';

export const UpdateModelCourseScreen = ({}: UpdateModelCourseScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
