import { View } from 'react-native';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

import { styles } from './styles';

export const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};
