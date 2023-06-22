import { View } from 'react-native';

import { ProfileDetail } from '../../components/ProfileDetail';
import { useUserRoute } from '../../navigation/UserNavigator/useUserRoute';

import { styles } from './styles';

export const ProfileDetailScreen = () => {
  const route = useUserRoute<'ProfileDetail'>();

  return (
    <View style={styles.container}>
      <ProfileDetail userId={route.params.userId} />
    </View>
  );
};
