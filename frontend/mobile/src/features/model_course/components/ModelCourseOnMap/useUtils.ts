// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import { useHomeNavigation } from '@/features/home/navigation/HomeNavigator';
import type { TravelSpot } from '@/features/travel_spot';

import type { useModelCourse } from '../../api/getModelCourse';
import type { MarkerPressEvent } from 'react-native-maps';

export const useUtils = ({
  modelCourseQuery,
}: {
  modelCourseQuery: ReturnType<typeof useModelCourse>;
}) => {
  const travelSpots = modelCourseQuery.data?.modelCourse.travelSpots;

  const homeNavigation = useHomeNavigation();

  const [displayTravelSpot, setDisplayTravelSpot] = useState<TravelSpot>();

  const handlePressCloseTravelSpotCardButton = () => {
    setDisplayTravelSpot(undefined);
  };

  const handlePressHStackTravelSpotIcon = (travelSpot: TravelSpot) => {
    setDisplayTravelSpot(travelSpot);
  };

  const handlePressTravelSpotMapMarker = ({
    // event,
    travelSpot,
  }: {
    event: MarkerPressEvent;
    travelSpot: TravelSpot;
  }) => {
    setDisplayTravelSpot(travelSpot);
  };

  const handlePressResetSelectedModelCourseButton = () => {
    homeNavigation.navigate('HomeHome', {});
  };

  return {
    travelSpots,
    displayTravelSpot,
    handlePressCloseTravelSpotCardButton,
    handlePressHStackTravelSpotIcon,
    handlePressTravelSpotMapMarker,
    handlePressResetSelectedModelCourseButton,
  };
};
