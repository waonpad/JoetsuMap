import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type { NotificationHomeScreenParams } from '../../screens/NotificationHomeScreen/types';

export type NotificationNavigationParamList = {
  NotificationHome: NotificationHomeScreenParams;
} & CommonScreenParamList;
