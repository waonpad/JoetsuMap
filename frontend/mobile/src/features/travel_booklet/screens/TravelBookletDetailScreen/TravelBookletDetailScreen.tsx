import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { TravelBookletDetail } from '../../components/TravelBookletDetail';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const TravelBookletDetailScreen = () => {
  const route = useTravelBookletRoute<'TravelBookletDetail'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <TravelBookletDetail travelBookletId={route.params.travelBookletId} />
      </Suspense>
    </View>
  );
};
