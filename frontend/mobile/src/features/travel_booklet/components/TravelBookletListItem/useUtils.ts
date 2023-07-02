// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useTravelBookletNavigation } from '../../navigation/TravelBookletNavigator';

import type { TravelBookletListItemProps } from './types';

export const useUtils = ({ travelBooklet }: TravelBookletListItemProps) => {
  const travelBookletNavigation = useTravelBookletNavigation();

  const handleNavigateToDetail = () => {
    travelBookletNavigation.navigate('TravelBookletDetail', {
      travelBookletId: travelBooklet.id,
    });
  };

  const handleNavigateToUpdate = () => {
    travelBookletNavigation.navigate('UpdateTravelBooklet', {
      travelBookletId: travelBooklet.id,
    });
  };

  const handleNavigateToAuthorProfile = () => {
    travelBookletNavigation.navigate('ProfileDetail', {
      userId: travelBooklet.author.id,
    });
  };

  return {
    handleNavigateToDetail,
    handleNavigateToUpdate,
    handleNavigateToAuthorProfile,
  };
};
