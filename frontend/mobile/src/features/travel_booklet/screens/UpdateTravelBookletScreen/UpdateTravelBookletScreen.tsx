import { View } from 'react-native';

import { UpdateTravelBookletForm } from '../../components/UpdateTravelBookletForm';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const UpdateTravelBookletScreen = () => {
  const route = useTravelBookletRoute<'UpdateTravelBooklet'>();

  return (
    <View style={styles.container}>
      <UpdateTravelBookletForm travelBookletId={route.params.travelBookletId} />
    </View>
  );
};
