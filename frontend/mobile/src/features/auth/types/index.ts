import type { User, UserResponse } from '@/features/user';

export type AuthUser = User;

export type AuthUserResponse = UserResponse;

export type JwtResponse = {
  token: string;
  user: AuthUser;
};
