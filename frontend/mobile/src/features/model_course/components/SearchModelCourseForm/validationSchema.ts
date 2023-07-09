// import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { SearchModelCourseFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<SearchModelCourseFormInput> = {
  freeKeyword: {
    // required: validations.required,
  },
};
