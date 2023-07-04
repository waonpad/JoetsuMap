import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type { ProfileDetailScreenParams } from '../../screens/ProfileDetailScreen/types';
import type { UpdateProfileScreenParams } from '../../screens/UpdateProfileScreen/types';

export type UserNavigationParamList = {
  ProfileDetail: ProfileDetailScreenParams;
  UpdateProfile: UpdateProfileScreenParams;
} & CommonScreenParamList;
