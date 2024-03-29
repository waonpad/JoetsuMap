import type { TravelSpot } from '@/features/travel_spot';
import type { SearchTravelSpotsDTO } from '@/features/travel_spot/api/searchTravelSpots';

export type SearchedTravelSpotIconsProps = {
  searchParams: SearchTravelSpotsDTO;
  onPress: (travelSpot: TravelSpot) => void;
};
