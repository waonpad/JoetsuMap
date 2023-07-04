import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type { PassingHistoryScreenParams } from '../../screens/PassingHistoryScreen/types';
import type { PassingHomeScreenParams } from '../../screens/PassingHomeScreen/types';

export type PassingNavigationParamList = {
  PassingHome: PassingHomeScreenParams;
  PassingHistory: PassingHistoryScreenParams;
} & CommonScreenParamList;
