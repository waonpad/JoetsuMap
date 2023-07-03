import type { ModelCourseDetailScreenParams } from '@/features/model_course/screens/ModelCourseDetailScreen/types';
import type { TravelBookletDetailScreenParams } from '@/features/travel_booklet/screens/TravelBookletDetailScreen/types';
import type { TravelSpotDetailScreenParams } from '@/features/travel_spot/screens/TravelSpotDetailScreen/types';
import type { ProfileDetailScreenParams } from '@/features/user/screens/ProfileDetailScreen/types';

export type CommonScreenParamList = {
  ModelCourseDetail: ModelCourseDetailScreenParams;
  TravelBookletDetail: TravelBookletDetailScreenParams;
  TravelSpotDetail: TravelSpotDetailScreenParams;
  ProfileDetail: ProfileDetailScreenParams;
};
