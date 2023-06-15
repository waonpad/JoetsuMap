import type { BaseEntity } from '@/types';

export type Notification = BaseEntity;

export type NotificationResponse = {
  notification: Notification;
};

export type NotificationListResponse = {
  notifications: Notification[];
};
