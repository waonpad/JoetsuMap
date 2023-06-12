import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native';

import { secureStore } from '@/lib/expo-secure-store';
import { useRootNavigation } from '@/navigation/RootNavigator/useRootNavigation';

export const SecureStoreTestScreen = () => {
  const rootNavigation = useRootNavigation();

  const [keyValueText, setKeyValueText] = useState<{ key: string; value: string }>({
    key: '',
    value: '',
  });

  const [secureStoreAllData, setSecureStoreAllData] = useState<
    { key: string; value: string | null }[]
  >([]);

  const onPressNavigateToHome = () => {
    rootNavigation.navigate('Home');
  };

  const onChangeKeyText = (text: string) => {
    setKeyValueText({ ...keyValueText, key: text });
  };

  const onChangeValueText = (text: string) => {
    setKeyValueText({ ...keyValueText, value: text });
  };

  const saveToSecureStore = async ({ key, value }: { key: string; value: string }) => {
    await secureStore.save(key, value);
  };

  const onPressSave = async () => {
    await saveToSecureStore(keyValueText);
    await getAllSecureStore();
  };

  const getAllSecureStore = async () => {
    const all = await secureStore.getAll();
    setSecureStoreAllData(all);
  };

  const deleteAllSecureStore = async () => {
    await secureStore.deleteAll();
    await getAllSecureStore();
  };

  useEffect(() => {
    getAllSecureStore();
  }, []);

  return (
    <View style={styles.container}>
      <Text>SecureStoreTestScreen</Text>
      <Button onPress={onPressNavigateToHome} title="Home画面に遷移する" />
      <TextInput placeholder="キーを入力してください" onChangeText={onChangeKeyText} />
      <TextInput placeholder="値を入力してください" onChangeText={onChangeValueText} />
      <Button onPress={onPressSave} title="SecureStoreに保存する" />
      <Text style={{ marginTop: 16 }}>保存済みの一覧</Text>
      <Button onPress={deleteAllSecureStore} title="全て削除する" />
      <FlatList
        data={secureStoreAllData}
        renderItem={({ item }) => (
          <Text>
            {item.key} : {item.value}
          </Text>
        )}
        keyExtractor={(item) => item.key}
      />
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
