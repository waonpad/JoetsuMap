import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const AboutScreen = () => {
  const rootNavigation = useRootNavigation();

  const onPress = () => {
    rootNavigation.navigate('Home');
  };

  const onPressTest = () => {
    rootNavigation.navigate('Test');
  };

  const onPressTest2 = () => {
    rootNavigation.navigate('Test2');
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
