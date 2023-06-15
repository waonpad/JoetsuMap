import type { BaseEntity, LatLng } from '@/types';

export type TrackedLocation = {
  coords: LatLng;
} & BaseEntity;

export type TrackedLocationResponse = {
  trackedLocation: TrackedLocation;
};

export type TrackedLocationListResponse = {
  trackedLocations: TrackedLocation[];
};
