import { ModelCourseDetailScreen } from '@/features/model_course/screens/ModelCourseDetailScreen';
import { TravelBookletDetailScreen } from '@/features/travel_booklet/screens/TravelBookletDetailScreen';
import { TravelSpotDetailScreen } from '@/features/travel_spot/screens/TravelSpotDetailScreen';
import { ProfileDetailScreen } from '@/features/user/screens/ProfileDetailScreen';

import type { CommonScreenParamList } from './types';

export const commonScreens: {
  [key in keyof CommonScreenParamList]: React.ComponentType<any>;
} = {
  ModelCourseDetail: ModelCourseDetailScreen,
  TravelBookletDetail: TravelBookletDetailScreen,
  TravelSpotDetail: TravelSpotDetailScreen,
  ProfileDetail: ProfileDetailScreen,
};
