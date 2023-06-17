import type { TravelBooklet } from '../../types';

export type UpdateTravelBookletFormProps = {
  travelBookletId: TravelBooklet['id'];
};

export type UpdateTravelBookletFormInput = {
  title: TravelBooklet['title'];
  text: TravelBooklet['text'];
};
