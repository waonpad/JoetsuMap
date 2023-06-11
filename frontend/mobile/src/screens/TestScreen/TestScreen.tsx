import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';
import { secureStore } from '@/lib/expo-secure-store';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';
import storage from '@/utils/storage';

export const TestScreen = () => {
  const rootNavigation = useRootNavigation();

  const [testValue, setTestValue] = useState('');

  const [token, setToken] = useState('');

  const { register, user, logout, login } = useAuth();

  const onPress = () => {
    rootNavigation.navigate('Home');
  };

  const getTestValue = async () => {
    const value = await secureStore.get('test');
    setTestValue(value ?? '');
  };

  const getToken = async () => {
    const token = await storage.getToken();
    setToken(token ?? '');
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

  useEffect(() => {
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text>TestScreen</Text>
      <Button title="Home画面に遷移する" onPress={onPress} />
      <TextInput
        onChangeText={(text) => {
          secureStore.save('test', text);
        }}
        placeholder="test"
      />
      <Text>test: {testValue}</Text>
      <Button title="testを取得する" onPress={getTestValue} />
      <Button title="register" onPress={onPressRegister} />
      <Button title="login" onPress={onPressLogin} />
      <Button title="logout" onPress={onPressLogout} />
      <Text>user: {user?.id ?? 'null'}</Text>
      <Text>スクリーンの再読み込み毎にtokenは再描画</Text>
      <Text>token: {token}</Text>
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
