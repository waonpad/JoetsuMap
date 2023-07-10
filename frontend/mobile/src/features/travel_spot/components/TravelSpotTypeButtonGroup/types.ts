import type { TravelSpot } from '../../types';

export type TravelSpotTypeButtonGroupLabel = TravelSpot['types'][number] | 'ALL';

export type TravelSpotTypeButtonGroupProps = {
  onPress?: (travelSpotType: TravelSpotTypeButtonGroupLabel) => void;
  activeTravelSpotType: TravelSpotTypeButtonGroupLabel | null;
};
