import type { UpdateTravelBookletDTO } from '../../api/updateTravelBooklet';
import type { TravelBooklet } from '../../types';

export type UpdateTravelBookletFormProps = {
  travelBookletId: TravelBooklet['id'];
};

export type UpdateTravelBookletFormInput = UpdateTravelBookletDTO['data'];
