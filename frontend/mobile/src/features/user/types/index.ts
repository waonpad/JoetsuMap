import type { ModelCourse } from '@/features/model_course';
import type { Passing } from '@/features/passing';
import type { TrackedLocation } from '@/features/tracked_location';
import type { TravelBooklet } from '@/features/travel_booklet';
import type { TravelSpot } from '@/features/travel_spot';
import type { ROLES, BaseEntity } from '@/types';

export type User = {
  email: string;
  username: string;
  roles?: ROLES[];
  icon: string;
  travelBooklets?: TravelBooklet[];
  travelSpots?: TravelSpot[];
  bookmarkedTravelSpots?: TravelSpot[];
  modelCourses?: ModelCourse[];
  bookmarkedModelCourses?: ModelCourse[];
  passings?: Passing[];
  notifications?: Notification[];
  trackedLocations?: TrackedLocation[];
} & BaseEntity;

export type UserResponse = {
  user: User;
};

export type UserListResponse = {
  users: User[];
};
