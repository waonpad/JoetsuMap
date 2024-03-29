import { View } from 'react-native';

import { usePassingRoute } from '../../navigation/PassingNavigator/usePassingRoute';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

export const PassingHomeScreen = () => {
  const route = usePassingRoute<'PassingHome'>();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
