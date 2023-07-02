import type { User } from '@/features/user';
import type { BaseEntity, LatLng, Page } from '@/types';

export type TrackedLocation = {
  coords: LatLng;
  author?: User;
} & BaseEntity;

export type TrackedLocationResponse = {
  trackedLocation: TrackedLocation;
};

export type TrackedLocationListResponse = {
  trackedLocations: TrackedLocation[];
};

export type TrackedLocationPageResponse = {
  trackedLocations: Page<TrackedLocation>;
};
