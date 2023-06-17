import type { TravelBooklet } from '../../types';

export type CreateTravelBookletFormProps = {
  defaultValues?: CreateTravelBookletFormInput;
};

export type CreateTravelBookletFormInput = {
  title: TravelBooklet['title'];
  text: TravelBooklet['text'];
};
