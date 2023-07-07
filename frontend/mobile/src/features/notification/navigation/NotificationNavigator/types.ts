import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type { NotificationDetailScreenParams } from '../../screens/NotificationDetail/types';
import type { NotificationHomeScreenParams } from '../../screens/NotificationHomeScreen/types';

export type NotificationNavigationParamList = {
  NotificationHome: NotificationHomeScreenParams;
  NotificationDetail: NotificationDetailScreenParams;
} & CommonScreenParamList;
