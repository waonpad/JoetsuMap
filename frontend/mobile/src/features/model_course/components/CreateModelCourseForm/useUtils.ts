// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import type { TravelSpot } from '@/features/travel_spot';
import type { SearchTravelSpotFormInput } from '@/features/travel_spot/components/SearchTravelSpotForm/types';

export const useUtils = () => {
  const [searchParams, setSearchParams] = useState<SearchTravelSpotFormInput>({
    freeKeyword: '',
  });

  const handleSubmitSearch = (searchParams: SearchTravelSpotFormInput) => {
    setSearchParams(searchParams);
  };

  const [travelSpots, setTravelSpots] = useState<TravelSpot[]>([]);

  const [selectedTravelSpot, setSelectedTravelSpot] = useState<TravelSpot>();

  const handlePressPushPopTravelSpotButton = () => {
    if (selectedTravelSpot) {
      if (travelSpots.map((travelSpot) => travelSpot.id).includes(selectedTravelSpot.id)) {
        setTravelSpots(travelSpots.filter((travelSpot) => travelSpot.id !== selectedTravelSpot.id));
      } else {
        setTravelSpots([...travelSpots, selectedTravelSpot]);
      }
    }
  };

  const handlePressTravelSpotIcon = (travelSpot: TravelSpot) => {
    setSelectedTravelSpot(travelSpot);
  };

  return {
    searchParams,
    handleSubmitSearch,
    travelSpots,
    selectedTravelSpot,
    handlePressPushPopTravelSpotButton,
    handlePressTravelSpotIcon,
  };
};
