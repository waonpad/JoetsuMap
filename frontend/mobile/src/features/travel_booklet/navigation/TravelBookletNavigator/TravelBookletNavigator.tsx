import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { commonScreenStackOptions, commonScreens } from '@/navigation/CommonScreens';
import { commonHeaderStyle } from '@/styles/theme';
import type { Screens } from '@/types';

import { CreateTravelBookletScreen } from '../../screens/CreateTravelBookletScreen';
import { TravelBookletHomeScreen } from '../../screens/TravelBookletHomeScreen';
import { UpdateTravelBookletScreen } from '../../screens/UpdateTravelBookletScreen';
import { UserTravelBookletScreen } from '../../screens/UserTravelBookletScreen';

import type { TravelBookletNavigationParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

const TravelBookletStack = createNativeStackNavigator<TravelBookletNavigationParamList>();

export const TravelBookletNavigator = () => {
  const travelBookletScreens: Screens<TravelBookletNavigationParamList> = {
    CreateTravelBooklet: CreateTravelBookletScreen,
    TravelBookletHome: TravelBookletHomeScreen,
    UpdateTravelBooklet: UpdateTravelBookletScreen,
    UserTravelBooklet: UserTravelBookletScreen,
    ...commonScreens,
  };

  const travelBookletScreenOptions: {
    [key in keyof TravelBookletNavigationParamList]?: NativeStackNavigationOptions;
  } = {
    CreateTravelBooklet: {
      title: '旅のしおり作成',
    },
    TravelBookletHome: {
      title: '旅のしおり',
    },
    UpdateTravelBooklet: {
      title: '旅のしおり更新',
    },
    UserTravelBooklet: {
      title: 'ユーザーの旅のしおり',
    },
    ...commonScreenStackOptions,
  };

  return (
    <TravelBookletStack.Navigator
      initialRouteName="TravelBookletHome"
      screenOptions={{ headerStyle: commonHeaderStyle }}>
      {Object.entries(travelBookletScreens).map(([name, component]) => (
        <TravelBookletStack.Screen
          key={name}
          name={name as keyof TravelBookletNavigationParamList}
          component={component}
          options={travelBookletScreenOptions[name as keyof TravelBookletNavigationParamList]}
        />
      ))}
    </TravelBookletStack.Navigator>
  );
};
