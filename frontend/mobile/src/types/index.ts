import type { ROLES as RoleTypes } from '@/lib/authorization';

export type BaseEntity = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type LatLng = {
  lat: number;
  lng: number;
};

export type ROLES = {
  id: number;
  name: keyof typeof RoleTypes;
};

export type Photo = string;
