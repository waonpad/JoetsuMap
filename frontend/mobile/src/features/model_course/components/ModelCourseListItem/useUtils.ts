// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useState } from 'react';

import { useModelCourseNavigation } from '../../navigation/ModelCourseNavigator';

import type { ModelCourseListItemProps } from './types';

export const useUtils = ({ modelCourse }: ModelCourseListItemProps) => {
  const modelCOurseNavigation = useModelCourseNavigation();

  const [isTravelSpotsVisible, setIsTravelSpotsVisible] = useState(false);

  const handlePressAuthorName = () => {
    modelCOurseNavigation.navigate('ProfileDetail', { userId: modelCourse.author.id });
  };

  const handlePressToggleTravelSpotsVisible = () => {
    setIsTravelSpotsVisible((prev) => !prev);
  };

  return {
    handlePressAuthorName,
    isTravelSpotsVisible,
    handlePressToggleTravelSpotsVisible,
  };
};
