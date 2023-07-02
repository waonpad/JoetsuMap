import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { TravelSpotDetail } from '../../components/TravelSpotDetail';
import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { styles } from './styles';

export const TravelSpotDetailScreen = () => {
  const route = useTravelSpotRoute<'TravelSpotDetail'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <TravelSpotDetail travelSpotId={route.params.travelSpotId} />
      </Suspense>
    </View>
  );
};
