import { View } from 'react-native';

import { UpdateProfileForm } from '../../components/UpdateProfileForm';
import { useUserRoute } from '../../navigation/UserNavigator/useUserRoute';

import { styles } from './styles';

export const UpdateProfileScreen = () => {
  const route = useUserRoute<'UpdateProfile'>();

  return (
    <View style={styles.container}>
      <UpdateProfileForm userId={route.params.userId} />
    </View>
  );
};
