import { View } from 'react-native';

import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { CONSTANT_EXAMPLE } from './constants';
import { styles } from './styles';
import { useUtils } from './useUtils';

export const TravelSpotHomeScreen = () => {
  const route = useTravelSpotRoute<'TravelSpotHome'>();

  const {} = useUtils();

  return <View style={styles.container}></View>;
};
