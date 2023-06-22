import { View } from 'react-native';

import { TravelSpotDetail } from '../../components/TravelSpotDetail';
import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { styles } from './styles';

export const TravelSpotDetailScreen = () => {
  const route = useTravelSpotRoute<'TravelSpotDetail'>();

  return (
    <View style={styles.container}>
      <TravelSpotDetail travelSpotId={route.params.travelSpotId} />
    </View>
  );
};
