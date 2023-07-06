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

export enum EXPECTED_EXCEPTION {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  TARGET_NOT_FOUND = 'TARGET_NOT_FOUND',
  ACCESS_DENIED = 'ACCESS_DENIED',
  FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  UNAUTHORIZED = 'UNAUTHORIZED',
  BAD_CREDENTIALS = 'BAD_CREDENTIALS',
  USER_DISABLED = 'USER_DISABLED',
  USER_LOCKED = 'USER_LOCKED',
  TRAVELSPOT_IN_MODELCOURSE_NOT_FOUND = 'TRAVELSPOT_IN_MODELCOURSE_NOT_FOUND',
}

export type ErrorResponse = {
  error: {
    code: number;
    message: string;
    type?: keyof typeof EXPECTED_EXCEPTION;
  };
};

export type ValidationError<T> = {
  validation: {
    [key in keyof T]?: string;
  };
};

// param.subParamのように、ネストしている場合はピリオドでつなげて返ってくる
export type MutationErrorResponse<T> = {
  error: ErrorResponse['error'] & ValidationError<T>;
};
