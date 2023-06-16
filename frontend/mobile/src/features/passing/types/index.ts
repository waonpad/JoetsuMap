import type { User } from '@/features/user';
import type { BaseEntity } from '@/types';

export type Passing = {
  passedUser: User;
} & BaseEntity;

export type PassingResponse = {
  passing: Passing;
};

export type PassingListResponse = {
  passings: Passing[];
};
