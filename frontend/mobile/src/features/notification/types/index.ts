import type { User } from '@/features/user';
import type { BaseEntity } from '@/types';

export type Notification = {
  recipient: User;
} & BaseEntity;

export type NotificationResponse = {
  notification: Notification;
};

export type NotificationListResponse = {
  notifications: Notification[];
};
