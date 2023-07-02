import { ScrollView } from 'react-native';

import { CreateTravelBookletForm } from '../../components/CreateTravelBookletForm';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const CreateTravelBookletScreen = () => {
  const route = useTravelBookletRoute<'CreateTravelBooklet'>();

  return (
    <ScrollView style={styles.container}>
      <CreateTravelBookletForm defaultValues={route.params.createTravelBookletFormDefaultValues} />
    </ScrollView>
  );
};
