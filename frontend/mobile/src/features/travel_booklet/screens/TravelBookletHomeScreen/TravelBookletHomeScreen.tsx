import { View } from 'react-native';

import { TravelBookletList } from '../../components/TravelBookletList';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const TravelBookletHomeScreen = () => {
  const route = useTravelBookletRoute<'TravelBookletHome'>();

  return (
    <View style={styles.container}>
      <TravelBookletList />
    </View>
  );
};
