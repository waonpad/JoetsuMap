import { Fab } from 'native-base';
import { AddIcon } from 'native-base';
import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { TravelBookletList } from '../../components/TravelBookletList';
import { useTravelBookletNavigation } from '../../navigation/TravelBookletNavigator';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import { styles } from './styles';

export const TravelBookletHomeScreen = () => {
  const route = useTravelBookletRoute<'TravelBookletHome'>();

  const travelBookletNavigation = useTravelBookletNavigation();

  const handlePressFab = () => {
    travelBookletNavigation.navigate('CreateTravelBooklet', {});
  };

  return (
    <View style={styles.container}>
      <Suspense>
        <TravelBookletList />
      </Suspense>
      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="sm"
        icon={<AddIcon />}
        onPress={handlePressFab}
        // label="投稿する"
      />
    </View>
  );
};
