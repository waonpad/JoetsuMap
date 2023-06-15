import type { ROLES, BaseEntity } from '@/types';

export type User = {
  email: string;
  username: string;
  roles: ROLES[];
} & BaseEntity;

export type UserResponse = {
  user: User;
} | null;
