import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { UpdateModelCourseFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<UpdateModelCourseFormInput> = {
  title: {
    required: validations.required,
  },
  travelSpotIds: {
    required: validations.required,
    minLength: validations.minLength(2),
    maxLength: validations.maxLength(10),
  },
};
