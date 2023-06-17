import { View } from 'react-native';

import { DEFAULT_UNAUTHORIZED_MESSAGE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

export const UnAuthorizedScreen = () => {
  const {} = useUtils();

  return <View style={styles.container}></View>;
};
