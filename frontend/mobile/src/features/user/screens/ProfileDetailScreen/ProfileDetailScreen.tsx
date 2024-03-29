import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';
import { BookmarkedModelCourseList } from '@/features/model_course/components/BookmarkedModelCourseList';
import { UserModelCourseList } from '@/features/model_course/components/UserModelCourseList';
import { UserTravelBookletList } from '@/features/travel_booklet/components/UserTravelBookletList';
import { BookmarkedTravelSpotList } from '@/features/travel_spot/components/BookmarkedTravelSpotList';

import { DisplayContentChangeButtonGroup } from '../../components/DisplayContentChangeButtonGroup';
import { ProfileDetail } from '../../components/ProfileDetail';
import { useUserRoute } from '../../navigation/UserNavigator/useUserRoute';

import { styles } from './styles';
import { useUtils } from './useUtils';

export const ProfileDetailScreen = () => {
  const route = useUserRoute<'ProfileDetail'>();

  const userId = route.params.userId;

  const { displayContent, changeDisplayContent } = useUtils();

  return (
    <View style={styles.container}>
      <View style={{ height: 10 }} />
      <View style={{ flex: 1, width: '100%' }}>
        <Suspense>
          <ProfileDetail userId={userId} />
        </Suspense>
      </View>
      <View style={{ flex: 1 }}>
        <DisplayContentChangeButtonGroup onPress={changeDisplayContent} userId={userId} />
      </View>
      <View style={{ flex: 6, width: '100%' }}>
        <Suspense>
          {displayContent === 'modelCourses' && <UserModelCourseList userId={userId} />}
          {displayContent === 'bookmarkedModelCourses' && <BookmarkedModelCourseList />}
          {displayContent === 'travelBooklets' && <UserTravelBookletList userId={userId} />}
          {displayContent === 'bookmarkedTravelSpots' && <BookmarkedTravelSpotList />}
        </Suspense>
      </View>
    </View>
  );
};
