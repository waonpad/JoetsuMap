import type { ComponentType } from 'react';

import type { ROLES as RoleTypes } from '@/lib/authorization';
import type { CommonScreenParamList } from '@/navigation/CommonScreens';

import type * as ImagePicker from 'expo-image-picker';
import type { FieldValues, Path, RegisterOptions } from 'react-hook-form';

export * from './pageable';

export type BaseEntity = {
  id: number;
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

export type PickedImage = ImagePicker.ImagePickerSuccessResult['assets'][number];

export type ToggleBookmarkResponse = {
  isBookmarked: boolean;
};

export type Screens<T extends Record<string, any>> = {
  [key in keyof Omit<T, keyof CommonScreenParamList>]: ComponentType<any>;
};
