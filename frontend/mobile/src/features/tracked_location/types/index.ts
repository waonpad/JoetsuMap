import type { User } from '@/features/user';
import type { BaseEntity, LatLng } from '@/types';

export type TrackedLocation = {
  coords: LatLng;
  user?: User;
} & BaseEntity;

export type TrackedLocationResponse = {
  trackedLocation: TrackedLocation;
};

export type TrackedLocationListResponse = {
  trackedLocations: TrackedLocation[];
};
