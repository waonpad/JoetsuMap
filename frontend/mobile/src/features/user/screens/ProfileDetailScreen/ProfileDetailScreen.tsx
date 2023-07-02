import { View } from 'react-native';

import { Suspense } from '@/components/Suspense';

import { ProfileDetail } from '../../components/ProfileDetail';
import { useUserRoute } from '../../navigation/UserNavigator/useUserRoute';

import { styles } from './styles';

export const ProfileDetailScreen = () => {
  const route = useUserRoute<'ProfileDetail'>();

  return (
    <View style={styles.container}>
      <Suspense>
        <ProfileDetail userId={route.params.userId} />
      </Suspense>
    </View>
  );
};
