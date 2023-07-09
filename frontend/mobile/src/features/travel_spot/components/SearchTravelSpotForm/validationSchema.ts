// import { validations } from '@/messages/validation';
import type { ReactHookFormValidationRules } from '@/types';

import type { SearchTravelSpotFormInput } from './types';

export const validationSchema: ReactHookFormValidationRules<SearchTravelSpotFormInput> = {
  freeKeyword: {
    // required: validations.required,
  },
};
