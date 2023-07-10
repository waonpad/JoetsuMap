// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { usePassingNavigation } from '../../navigation/PassingNavigator';

import type { PassingHistoryListItemProps } from './types';

export const useUtils = ({ passing }: PassingHistoryListItemProps) => {
  const passingNavigation = usePassingNavigation();

  const handleAvatarPress = () => {
    passingNavigation.navigate('ProfileDetail', { userId: passing.passedUser.id });
  };

  return {
    handleAvatarPress,
  };
};
