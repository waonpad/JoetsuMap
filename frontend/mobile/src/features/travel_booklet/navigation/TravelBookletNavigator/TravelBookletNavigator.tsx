import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreens } from '@/navigation/CommonScreens';
import type { Screens } from '@/types';

import { CreateTravelBookletScreen } from '../../screens/CreateTravelBookletScreen';
import { TravelBookletHomeScreen } from '../../screens/TravelBookletHomeScreen';
import { UpdateTravelBookletScreen } from '../../screens/UpdateTravelBookletScreen';

import type { TravelBookletNavigationParamList } from './types';

const TravelBookletStack = createNativeStackNavigator<TravelBookletNavigationParamList>();

const travelBookletScreens: Screens<TravelBookletNavigationParamList> = {
  CreateTravelBooklet: CreateTravelBookletScreen,
  TravelBookletHome: TravelBookletHomeScreen,
  UpdateTravelBooklet: UpdateTravelBookletScreen,
};

export const TravelBookletNavigator = () => {
  return (
    <TravelBookletStack.Navigator initialRouteName="TravelBookletHome">
      {Object.entries({
        ...travelBookletScreens,
        ...commonScreens,
      }).map(([name, component]) => (
        <TravelBookletStack.Screen
          key={name}
          name={name as keyof TravelBookletNavigationParamList}
          component={component}
        />
      ))}
    </TravelBookletStack.Navigator>
  );
};
