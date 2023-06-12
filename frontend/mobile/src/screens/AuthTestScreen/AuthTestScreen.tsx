import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const AuthTestScreen = () => {
  const rootNavigation = useRootNavigation();

  const { register, user, logout, login } = useAuth();

  const onPress = () => {
    rootNavigation.navigate('Home');
  };

  const onPressRegister = async () => {
    const registerParams = {
      username: 'test',
      password: 'testpassword',
      email: 'test@example.com',
      role: [ROLES.ROLE_USER],
    };

    await register(registerParams);
  };

  const onPressLogout = () => {
    logout();
  };

  const onPressLogin = async () => {
    const loginParams = {
      username: 'test',
      password: 'testpassword',
    };

    await login(loginParams);
  };

  return (
    <View style={styles.container}>
      <Text>TestScreen</Text>
      <Button title="Home画面に遷移する" onPress={onPress} />
      <Button title="register" onPress={onPressRegister} />
      <Button title="login" onPress={onPressLogin} />
      <Button title="logout" onPress={onPressLogout} />
      <Text>user: {user?.id ?? 'null'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
