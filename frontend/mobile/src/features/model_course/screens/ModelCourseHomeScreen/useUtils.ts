// APIとの通信を行わない簡単なstateの管理や、データ整形等

import { useModelCourseNavigation } from '../../navigation/ModelCourseNavigator';

export const useUtils = () => {
  const modelCourseNavigation = useModelCourseNavigation();

  const handlePressNavigateToCreateModelCourse = () => {
    modelCourseNavigation.navigate('CreateModelCourse', {});
  };

  const handlePressNavigateToSearchModelCourse = () => {
    modelCourseNavigation.navigate('SearchModelCourse', {});
  };
  return {
    handlePressNavigateToCreateModelCourse,
    handlePressNavigateToSearchModelCourse,
  };
};
