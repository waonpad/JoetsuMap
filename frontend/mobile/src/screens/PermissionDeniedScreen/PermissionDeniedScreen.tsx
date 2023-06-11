import React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';

import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const PermissionDeniedScreen = () => {
  const rootNavigation = useRootNavigation();

  const onPress = () => {
    rootNavigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text>PermissionDeniedScreen</Text>
      <Text>アクセス権限がありません。</Text>
      <Button title="Home画面に遷移する" onPress={onPress} />
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
