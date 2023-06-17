import type { ROLES as RoleTypes } from '@/lib/authorization';
import type { UnAuthorizedScreenParams } from '@/screens/UnAuthorizedScreen/types';

import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';

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

export type ReactHookFormValidationRules<T extends FieldValues> = Record<
  keyof T,
  Omit<RegisterOptions<T, Path<T>>, 'value'> | undefined
>;

export type BaseNavigationParamList = {
  PermissionDenied: undefined;
  Unauthorized: UnAuthorizedScreenParams;
};
