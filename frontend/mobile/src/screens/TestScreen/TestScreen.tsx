import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';

import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';
import { secureStore } from '@/lib/expo-secure-store';
import storage from '@/utils/storage';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const TestScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'About'>>();

  const [testValue, setTestValue] = useState('');

  const [token, setToken] = useState('');

  const { register, user, logout, login } = useAuth();

  const onPress = () => {
    navigation.navigate('About');
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
      <Button title="About画面に遷移する" onPress={onPress} />
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
