import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { LoginFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<LoginFormInput> = {
  username: {
    required: validations.required,
  },
  password: {
    required: validations.required,
  },
};
