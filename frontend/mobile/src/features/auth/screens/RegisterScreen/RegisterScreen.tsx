import { ScrollView } from 'react-native';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';

import { styles } from './styles';

export const RegisterScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <RegisterForm />
    </ScrollView>
  );
};
