// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import { useAppNavigation } from '@/navigation/AppNavigator';

import { useModelCourseNavigation } from '../../navigation/ModelCourseNavigator';

import type { ModelCourseListItemProps } from './types';

export const useUtils = ({ modelCourse }: ModelCourseListItemProps) => {
  const modelCOurseNavigation = useModelCourseNavigation();

  const appNavigation = useAppNavigation();

  const [isTravelSpotsVisible, setIsTravelSpotsVisible] = useState(false);

  const handlePressAuthorName = () => {
    modelCOurseNavigation.navigate('ProfileDetail', { userId: modelCourse.author.id });
  };

  const handlePressToggleTravelSpotsVisible = () => {
    setIsTravelSpotsVisible((prev) => !prev);
  };

  const handlePressNavigateToMapButton = () => {
    appNavigation.navigate('Home', {
      screen: 'HomeHome',
      params: {
        selectedModelCourseId: modelCourse.id,
      },
    } as any);
  };

  return {
    handlePressAuthorName,
    isTravelSpotsVisible,
    handlePressToggleTravelSpotsVisible,
    handlePressNavigateToMapButton,
  };
};
