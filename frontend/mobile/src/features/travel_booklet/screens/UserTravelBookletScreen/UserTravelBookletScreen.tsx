import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { UserTravelBookletList } from '../../components/UserTravelBookletList';
import { useTravelBookletRoute } from '../../navigation/TravelBookletNavigator';

import { styles } from './styles';

export const UserTravelBookletScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const route = useTravelBookletRoute<'UserTravelBooklet'>();

  return (
    <View style={styles.container}>
      <View style={{ height: 10 }} />
      <Suspense>
        <UserTravelBookletList userId={route.params.userId} />
      </Suspense>
    </View>
  );
};
