// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useHomeNavigation } from '@/features/home/navigation/HomeNavigator';

import type { TravelSpotListItemProps } from './types';

export const useUtils = ({ travelSpot }: TravelSpotListItemProps) => {
  const homeNavigation = useHomeNavigation();

  const handleNavigateToDetail = () => {
    homeNavigation.navigate('TravelSpotDetail', {
      travelSpotId: travelSpot.id,
    });
  };
  return {
    handleNavigateToDetail,
  };
};
