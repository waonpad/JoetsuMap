import { View } from 'react-native';

import { TravelBookletDetail } from '../../components/TravelBookletDetail';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const TravelBookletDetailScreen = () => {
  const route = useTravelBookletRoute<'TravelBookletDetail'>();

  return (
    <View style={styles.container}>
      <TravelBookletDetail travelBookletId={route.params.travelBookletId} />
    </View>
  );
};
