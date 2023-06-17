import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { UpdateTravelBookletFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<UpdateTravelBookletFormInput> = {
  title: {
    required: validations.required,
  },
  text: {
    required: validations.required,
  },
};
