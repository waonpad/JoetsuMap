import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const AboutScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home' | 'Test' | 'Test2'>>();

  const onPress = () => {
    navigation.navigate('Home');
  };

  const onPressTest = () => {
    navigation.navigate('Test');
  };

  const onPressTest2 = () => {
    navigation.navigate('Test2');
  };

  return (
    <View style={styles.container}>
      <Text>AboutScreen</Text>
      <Button title="Home画面に遷移する" onPress={onPress} />
      <Button title="Test画面に遷移する" onPress={onPressTest} />
      <Button title="Test2画面に遷移する" onPress={onPressTest2} />
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
