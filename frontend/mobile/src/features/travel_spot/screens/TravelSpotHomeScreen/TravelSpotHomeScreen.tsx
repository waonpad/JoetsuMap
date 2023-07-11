import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { TravelSpotList } from '../../components/TravelSpotList';
import { TravelSpotTypeButtonGroup } from '../../components/TravelSpotTypeButtonGroup';
import { useTravelSpotRoute } from '../../navigation/TravelSpotNavigator/useTravelSpotRoute';

import { styles } from './styles';

export const TravelSpotHomeScreen = () => {
  const route = useTravelSpotRoute<'TravelSpotHome'>();

  return (
    <View style={styles.container}>
      <TravelSpotTypeButtonGroup activeTravelSpotType={'ALL'} />
      <View style={{ height: 10 }} />
      <Suspense>
        <TravelSpotList />
      </Suspense>
    </View>
  );
};
