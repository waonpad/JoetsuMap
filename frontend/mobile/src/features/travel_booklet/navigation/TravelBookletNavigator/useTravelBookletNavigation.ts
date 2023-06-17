import { useNavigation } from '@react-navigation/native';

import type { TravelBookletNavigationParamList } from './TravelBookletNavigator';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useTravelBookletNavigation = () => {
  return useNavigation<NativeStackNavigationProp<TravelBookletNavigationParamList>>();
};
