import type { TravelSpot } from '@/features/travel_spot';

export type SelectedTravelSpotBottomSheetProps = {
  travelSpot: TravelSpot;
  isContainedForTravelSpots: boolean;
  onPressPushPopTravelSpotButton: (travelSpot: TravelSpot) => void;
};
