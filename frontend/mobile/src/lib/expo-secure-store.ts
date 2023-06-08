import * as SecureStore from 'expo-secure-store';

export const secureStore = {
  save: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
  },
  get: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  delete: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
  },
};
