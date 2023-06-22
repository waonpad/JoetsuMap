import { View } from 'react-native';

import { TravelSpotList } from '../../components/TravelSpotList';
import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { styles } from './styles';

export const TravelSpotHomeScreen = () => {
  const route = useTravelSpotRoute<'TravelSpotHome'>();

  return (
    <View style={styles.container}>
      <TravelSpotList />
    </View>
  );
};
