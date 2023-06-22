import type { User } from '@/features/user';
import type { BaseEntity } from '@/types';

export type Notification = {
  title: string;
  body: string;
  data: any;
  isRead: boolean;
  sender: User;
} & BaseEntity;

export type NotificationResponse = {
  notification: Notification;
};

export type NotificationListResponse = {
  notifications: Notification[];
};
