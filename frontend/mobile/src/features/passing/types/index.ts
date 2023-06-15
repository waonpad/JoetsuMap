import type { User } from '@/features/user';
import type { BaseEntity } from '@/types';

export type Passing = {
  users: User[];
} & BaseEntity;

export type PassingResponse = {
  passing: Passing;
};

export type PassingListResponse = {
  passings: Passing[];
};
