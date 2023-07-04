import type { CommonScreenParamList } from '@/navigation/CommonScreens/types';

import type { CreateTravelBookletScreenParams } from '../../screens/CreateTravelBookletScreen/types';
import type { TravelBookletHomeScreenParams } from '../../screens/TravelBookletHomeScreen/types';
import type { UpdateTravelBookletScreenParams } from '../../screens/UpdateTravelBookletScreen/types';

export type TravelBookletNavigationParamList = {
  CreateTravelBooklet: CreateTravelBookletScreenParams;
  // TravelBookletDetail: TravelBookletDetailScreenParams;
  TravelBookletHome: TravelBookletHomeScreenParams;
  UpdateTravelBooklet: UpdateTravelBookletScreenParams;
} & CommonScreenParamList;
