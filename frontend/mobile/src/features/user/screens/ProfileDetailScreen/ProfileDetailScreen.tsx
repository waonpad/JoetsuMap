import { View } from 'react-native';

import { useUserRoute } from '../../navigation/UserNavigator/useUserRoute';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

export const ProfileDetailScreen = () => {
  const route = useUserRoute<'ProfileDetail'>();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
