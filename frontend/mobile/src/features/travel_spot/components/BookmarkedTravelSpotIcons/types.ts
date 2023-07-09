import type { TravelSpot } from '@/features/travel_spot';

export type BookmarkedTravelSpotListProps = {
  onPress: (travelSpot: TravelSpot) => void;
};
