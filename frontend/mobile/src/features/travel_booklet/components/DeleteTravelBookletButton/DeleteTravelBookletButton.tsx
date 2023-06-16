import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useLogics } from './useLogics';
import { useUtils } from './useUtils';

import type { DeleteTravelBookletButtonProps } from './types';

export const DeleteTravelBookletButton = ({}: DeleteTravelBookletButtonProps) => {
  const {} = useLogics();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
