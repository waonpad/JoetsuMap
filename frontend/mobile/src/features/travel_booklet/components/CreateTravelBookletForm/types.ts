import type { CreateTravelBookletDTO } from '../../api/createTravelBooklet';

export type CreateTravelBookletFormProps = {
  defaultValues?: CreateTravelBookletFormInput;
};

export type CreateTravelBookletFormInput = CreateTravelBookletDTO['data'];
