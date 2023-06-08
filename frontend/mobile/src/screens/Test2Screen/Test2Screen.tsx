import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const Test2Screen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'About'>>();

  const onPress = () => {
    navigation.navigate('About');
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
