import type { ROLES, BaseEntity } from '@/types';

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  roles: ROLES[];
} & BaseEntity;

export type UserResponse = {
  user: AuthUser;
} | null;

export type JwtResponse = {
  token: string;
  user: AuthUser;
};
