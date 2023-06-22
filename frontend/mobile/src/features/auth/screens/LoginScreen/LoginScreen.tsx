import { View } from 'react-native';

import { LoginForm } from '../../components/LoginForm';

import { styles } from './styles';

export const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};
