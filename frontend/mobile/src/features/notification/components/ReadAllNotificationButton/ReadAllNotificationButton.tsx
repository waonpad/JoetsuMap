import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { useUtils } from './useUtils';

import type { ReadAllNotficationButtonProps } from './types';

export const ReadAllNotficationButton = ({}: ReadAllNotficationButtonProps) => {
  const {} = useLogics();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
