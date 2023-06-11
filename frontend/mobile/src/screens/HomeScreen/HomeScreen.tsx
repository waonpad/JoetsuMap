import React from 'react';

// import { Button } from '@rneui/themed';
import { Button } from 'native-base';
import { StyleSheet, View, Text } from 'react-native';

import { useTestConnection } from '@/features/test';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const HomeScreen = () => {
  const rootNavigation = useRootNavigation();

  const testConnectionQuery = useTestConnection();

  const onPress = () => {
    rootNavigation.navigate('Test');
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      {/* @renui/themed */}
      {/* <Button
          title="About画面に遷移する"
          onPress={onPress}
          icon={{
            name: 'android',
            color: 'white',
          }}
        /> */}
      {/* native-base */}
      <Button onPress={onPress}>Test画面に遷移する</Button>
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
