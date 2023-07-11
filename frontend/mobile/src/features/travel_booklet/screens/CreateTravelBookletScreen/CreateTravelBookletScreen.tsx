import { View } from 'react-native';

import { CreateTravelBookletForm } from '../../components/CreateTravelBookletForm';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const CreateTravelBookletScreen = () => {
  const route = useTravelBookletRoute<'CreateTravelBooklet'>();

  return (
    <View style={styles.container}>
      <CreateTravelBookletForm defaultValues={route.params.createTravelBookletFormDefaultValues} />
    </View>
  );
};
