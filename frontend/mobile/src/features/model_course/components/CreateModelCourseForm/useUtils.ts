// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import { Alert } from 'react-native';

import type { TravelSpot } from '@/features/travel_spot';
import type { SearchTravelSpotFormInput } from '@/features/travel_spot/components/SearchTravelSpotForm/types';

type DisplayTravelSpotIcons = 'bookmarked' | 'searched' | 'all';

export const useUtils = ({
  travelSpots,
  setTravelSpots,
}: {
  travelSpots: TravelSpot[];
  setTravelSpots: React.Dispatch<React.SetStateAction<TravelSpot[]>>;
}) => {
  const [searchParams, setSearchParams] = useState<SearchTravelSpotFormInput>({
    freeKeyword: '',
  });

  const handleSubmitSearch = (searchParams: SearchTravelSpotFormInput) => {
    setSearchParams(searchParams);
    setDisplayTravelSpotIcons('searched');
  };

  const [selectedTravelSpot, setSelectedTravelSpot] = useState<TravelSpot>();

  const [displayTravelSpotIcons, setDisplayTravelSpotIcons] =
    useState<DisplayTravelSpotIcons>('bookmarked');

  const handlePressPushPopTravelSpotButton = () => {
    if (selectedTravelSpot) {
      if (travelSpots.map((travelSpot) => travelSpot.id).includes(selectedTravelSpot.id)) {
        setTravelSpots(travelSpots.filter((travelSpot) => travelSpot.id !== selectedTravelSpot.id));
      } else {
        if (travelSpots.length === 10) {
          Alert.alert('10箇所以上は登録できません');
          return;
        }
        setTravelSpots([...travelSpots, selectedTravelSpot]);
      }
    }
  };

  const handlePressTravelSpotIcon = (travelSpot: TravelSpot) => {
    setSelectedTravelSpot(travelSpot);
  };

  const handlePressChnageDisplayTravelSpotIcons = (type: DisplayTravelSpotIcons) => {
    setDisplayTravelSpotIcons(type);
  };

  const handlePressCloseBottomSheetButton = () => {
    setSelectedTravelSpot(undefined);
  };

  return {
    searchParams,
    handleSubmitSearch,
    travelSpots,
    selectedTravelSpot,
    handlePressPushPopTravelSpotButton,
    handlePressTravelSpotIcon,
    displayTravelSpotIcons,
    handlePressChnageDisplayTravelSpotIcons,
    handlePressCloseBottomSheetButton,
  };
};
