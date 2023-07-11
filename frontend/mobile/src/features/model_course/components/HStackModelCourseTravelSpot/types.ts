import type { TravelSpot } from '@/features/travel_spot';

export type HStackModelCourseTravelSpotProps = {
  travelSpots: TravelSpot[];
  onPressTravelSpot: (travelSpot: TravelSpot) => void;
  fill?: boolean;
};
