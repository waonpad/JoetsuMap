import type { CommonScreenParamList } from '@/navigation/CommonScreens';

// import type { TravelSpotDetailScreenParams } from '../../screens/TravelSpotDetailScreen/types';
import type { TravelSpotHomeScreenParams } from '../../screens/TravelSpotHomeScreen/types';
import type { TypedTravelSpotScreenParams } from '../../screens/TypedTravelSpotScreen/types';

export type TravelSpotNavigationParamList = {
  // TravelSpotDetail: TravelSpotDetailScreenParams;
  TravelSpotHome: TravelSpotHomeScreenParams;
  TypedTravelSpot: TypedTravelSpotScreenParams;
} & CommonScreenParamList;
