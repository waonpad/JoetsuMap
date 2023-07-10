import type { HomeScreenParams } from '@/features/home/screens/HomeScreen/types';
import type { TravelSpotHomeScreenParams } from '@/features/travel_spot/screens/TravelSpotHomeScreen/types';
import type { TypedTravelSpotScreenParams } from '@/features/travel_spot/screens/TypedTravelSpotScreen/types';
import type { CommonScreenParamList } from '@/navigation/CommonScreens';

export type HomeNavigationParamList = {
  HomeHome: HomeScreenParams;
  TravelSpotHome: TravelSpotHomeScreenParams;
  TypedTravelSpot: TypedTravelSpotScreenParams;
} & CommonScreenParamList;
