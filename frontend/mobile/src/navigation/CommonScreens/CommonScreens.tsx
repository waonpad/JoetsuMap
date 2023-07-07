import { ModelCourseDetailScreen } from '@/features/model_course/screens/ModelCourseDetailScreen';
import { TravelBookletDetailScreen } from '@/features/travel_booklet/screens/TravelBookletDetailScreen';
import { TravelSpotDetailScreen } from '@/features/travel_spot/screens/TravelSpotDetailScreen';
import { ProfileDetailScreen } from '@/features/user/screens/ProfileDetailScreen';

import type { CommonScreenParamList } from './types';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const commonScreens: {
  [key in keyof CommonScreenParamList]: React.ComponentType<any>;
} = {
  ModelCourseDetail: ModelCourseDetailScreen,
  TravelBookletDetail: TravelBookletDetailScreen,
  TravelSpotDetail: TravelSpotDetailScreen,
  ProfileDetail: ProfileDetailScreen,
};

export const commonScreenStackOptions: {
  [key in keyof CommonScreenParamList]?: NativeStackNavigationOptions;
} = {
  ModelCourseDetail: {
    title: 'モデルコース詳細',
  },
  TravelBookletDetail: {
    title: '旅のしおり詳細',
  },
  TravelSpotDetail: {
    title: '観光スポット詳細',
  },
  ProfileDetail: {
    title: 'プロフィール詳細',
  },
};
