import { View } from 'react-native';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

import type { SettingHomeScreenProps } from './types';

export const SettingHomeScreen = ({}: SettingHomeScreenProps) => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
