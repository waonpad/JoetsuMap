import { useNavigation } from '@react-navigation/native';

import type { TravelSpotNavigationParamList } from './types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const useTravelSpotNavigation = () => {
  return useNavigation<NativeStackNavigationProp<TravelSpotNavigationParamList>>();
};
