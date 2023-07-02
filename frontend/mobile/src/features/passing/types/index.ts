import type { User } from '@/features/user';
import type { BaseEntity, Page } from '@/types';

export type Passing = {
  passedUser: User;
} & BaseEntity;

export type PassingResponse = {
  passing: Passing;
};

export type PassingListResponse = {
  passings: Passing[];
};

export type PassingPageResponse = {
  passings: Page<Passing>;
};
