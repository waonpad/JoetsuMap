import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

import { useTestConnection } from '@/features/test';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'About'>>();

  const testConnectionQuery = useTestConnection();

  const onPress = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <Button
        title="About画面に遷移する"
        onPress={onPress}
        icon={{
          name: 'android',
        }}
      />
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
