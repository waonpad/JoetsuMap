import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { RegisterFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<RegisterFormInput> = {
  username: {
    required: validations.required,
  },
  email: {
    required: validations.required,
    pattern: validations.email,
  },
  password: {
    required: validations.required,
  },
  confirmPassword: {
    required: validations.required,
  },
  roles: {
    // required: validations.required,
  },
  icon: {
    // required: validations.required,
  },
};
