import type { TravelSpot } from '@/features/travel_spot';
import type { User } from '@/features/user';
import type { BaseEntity, Page } from '@/types';

export type ModelCourse = {
  title: string;
  travelSpots: TravelSpot[];
  author: User;
  bookmarkedUsers?: User[];
} & BaseEntity;

export type ModelCourseResponse = {
  modelCourse: ModelCourse;
};

export type ModelCourseListResponse = {
  modelCourses: ModelCourse[];
};

export type ModelCoursePageResponse = {
  modelCourses: Page<ModelCourse>;
};
