import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { TravelSpotTypeButtonGroup } from '../../components/TravelSpotTypeButtonGroup';
import { TypedTravelSpotList } from '../../components/TypedTravelSpotList';
import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { styles } from './styles';

export const TypedTravelSpotScreen = () => {
  const route = useTravelSpotRoute<'TypedTravelSpot'>();

  return (
    <View style={styles.container}>
      <TravelSpotTypeButtonGroup activeTravelSpotType={route.params.travelSpotType} />
      <Suspense>
        <TypedTravelSpotList travelSpotType={route.params.travelSpotType} />
      </Suspense>
    </View>
  );
};
