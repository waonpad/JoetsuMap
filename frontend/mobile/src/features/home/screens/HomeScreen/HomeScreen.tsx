import { View } from 'react-native';

import { useHomeRoute } from '@/features/home/navigation/HomeNavigator/useHomeRoute';
import { ModelCourseOnMap } from '@/features/model_course/components/ModelCourseOnMap/ModelCourseOnMap';
import { TravelSpotTypeButtonGroup } from '@/features/travel_spot/components/TravelSpotTypeButtonGroup';

import { styles } from './styles';

export const HomeScreen = () => {
  const route = useHomeRoute<'HomeHome'>();

  return (
    <View style={styles.container}>
      {/* 観光地へのトップタブナビゲーションを配置 */}
      <TravelSpotTypeButtonGroup activeTravelSpotType={null} />
      <ModelCourseOnMap
        // なぜかparamsがundefinedになる
        modelCourseId={route.params ? route.params.selectedModelCourseId : undefined}
      />
    </View>
  );
};
