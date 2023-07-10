import { Button } from 'native-base';
import { Dimensions, View } from 'react-native';

import { Suspense } from '@/components/Suspense';
import { useAuth } from '@/lib/auth';

import { TravelBookletList } from '../../components/TravelBookletList';
import { useTravelBookletNavigation } from '../../navigation/TravelBookletNavigator';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator/useTravelBookletRoute';

import {
  NAVIGATE_TO_CREATE_TRAVEL_BOOKLET_BUTTON_LABEL,
  NAVIGATE_TO_MY_TRAVEL_BOOKLET_BUTTON_LABEL,
} from './constants';
import { styles } from './styles';

export const TravelBookletHomeScreen = () => {
  const { user } = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const route = useTravelBookletRoute<'TravelBookletHome'>();

  const travelBookletNavigation = useTravelBookletNavigation();

  const handlePressNavigateToCreateTravelBooklet = () => {
    travelBookletNavigation.navigate('CreateTravelBooklet', {});
  };

  const handlePressNavigateToMyTravelBooklet = () => {
    if (!user) {
      return;
    }
    travelBookletNavigation.navigate('UserTravelBooklet', {
      userId: user?.id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 10 }} />
      <Button
        variant={'outline'}
        _text={{ color: 'text.800', bold: true }}
        bg={'white'}
        width={'100%'}
        onPress={handlePressNavigateToCreateTravelBooklet}
        marginX={Dimensions.get('window').width * 0.025}>
        {NAVIGATE_TO_CREATE_TRAVEL_BOOKLET_BUTTON_LABEL}
      </Button>
      <View style={{ height: 10 }} />
      <Button
        variant={'outline'}
        _text={{ color: 'text.800', bold: true }}
        bg={'white'}
        width={'100%'}
        onPress={handlePressNavigateToMyTravelBooklet}
        marginX={Dimensions.get('window').width * 0.025}>
        {NAVIGATE_TO_MY_TRAVEL_BOOKLET_BUTTON_LABEL}
      </Button>
      <View style={{ height: 10 }} />
      <Suspense>
        <TravelBookletList />
      </Suspense>
    </View>
  );
};
