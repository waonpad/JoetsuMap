// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useHomeNavigation } from '@/features/home/navigation/HomeNavigator';

import type { TravelSpotTypeButtonGroupLabel } from './types';

export const useUtils = () => {
  const homeNavigation = useHomeNavigation();

  const handlePressTravelSpotTypeButton = (type: TravelSpotTypeButtonGroupLabel) => {
    if (type === 'ALL') {
      homeNavigation.navigate('TravelSpotHome', {});
      return;
    }
    homeNavigation.navigate('TypedTravelSpot', { travelSpotType: type });
  };

  return {
    handlePressTravelSpotTypeButton,
  };
};
