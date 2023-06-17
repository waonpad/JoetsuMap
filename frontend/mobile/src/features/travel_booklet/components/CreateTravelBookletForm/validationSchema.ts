import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { CreateTravelBookletFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<CreateTravelBookletFormInput> = {
  title: {
    required: validations.required,
  },
  text: {
    required: validations.required,
  },
};
