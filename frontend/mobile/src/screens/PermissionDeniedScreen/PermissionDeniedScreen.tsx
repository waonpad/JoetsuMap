import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Button } from 'react-native';

import type { RootStackParamList } from '../../navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const PermissionDeniedScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const onPress = () => {
    navigation.navigate('Home');
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
