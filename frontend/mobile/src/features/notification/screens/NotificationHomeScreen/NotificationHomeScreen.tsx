import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { NotficationHomeScreenProps } from './types';

export const NotficationHomeScreen = ({}: NotficationHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
