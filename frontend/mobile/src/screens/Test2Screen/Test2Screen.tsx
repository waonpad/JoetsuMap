import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const Test2Screen = () => {
  const rootNavigation = useRootNavigation();

  const onPress = () => {
    rootNavigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <Text>Test2Screen</Text>
      <Button title="About画面に遷移する" onPress={onPress} />
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
