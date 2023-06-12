import React from 'react';

import { Button } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

import { useTestConnection } from '@/features/test';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const HomeScreen = () => {
  const rootNavigation = useRootNavigation();

  const testConnectionQuery = useTestConnection();

  const onPressNavigateToAuthTest = () => {
    rootNavigation.navigate('AuthTest');
  };

  const onPressNavigateToSecureStoreTest = () => {
    rootNavigation.navigate('SecureStoreTest');
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button onPress={onPressNavigateToAuthTest}>AuthTest画面に遷移する</Button>
      <Button onPress={onPressNavigateToSecureStoreTest}>SecureStoreTest画面に遷移する</Button>
      <Text>{testConnectionQuery.data}</Text>
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
