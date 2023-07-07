import type { User } from '@/features/user';
import type { BaseEntity, Page } from '@/types';

export type Notification = {
  recipientToken: string;
  title: string;
  body: string;
  data: any;
  isRead: boolean;
  sender: User;
  recipient?: User;
} & BaseEntity;

export type NotificationResponse = {
  notification: Notification;
};

export type NotificationListResponse = {
  notifications: Notification[];
};

export type NotificationPageResponse = {
  notifications: Page<Notification>;
};
