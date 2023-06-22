import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { CreateModelCourseFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<CreateModelCourseFormInput> = {
  title: {
    required: validations.required,
  },
  travelSpotIds: {
    required: validations.required,
    minLength: validations.minLength(2),
  },
};
