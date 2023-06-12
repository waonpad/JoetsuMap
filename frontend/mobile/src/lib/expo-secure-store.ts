import * as SecureStore from 'expo-secure-store';

import { AUTH_TOKEN_KEY } from '@/constants';

const SECURE_STORE_ALL_KEY_STORE_KEY = 'expo-sexure-store-all-keys';
const SECURE_STORE_KEY_SEPARATOR = ',';
const spr = SECURE_STORE_KEY_SEPARATOR;

const PERMANENT_SECURE_STORE_KEYS: string[] = [AUTH_TOKEN_KEY];

export const secureStore = {
  ...SecureStore,
  save: async (key: string, value: string) => {
    await SecureStore.setItemAsync(key, value);
    const allKeys = await SecureStore.getItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
    if (allKeys) {
      const keys = allKeys.split(spr);
      if (!keys.includes(key)) {
        keys.push(key);
        await SecureStore.setItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY, keys.join(spr));
      }
    } else {
      await SecureStore.setItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY, key);
    }
  },
  get: async (key: string) => {
    return await SecureStore.getItemAsync(key);
  },
  delete: async (key: string) => {
    await SecureStore.deleteItemAsync(key);
    const allKeys = await SecureStore.getItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
    if (allKeys) {
      const keys = allKeys.split(spr).filter((k) => k !== key);
      await SecureStore.setItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY, keys.join(spr));
    }
  },
  getAllKeys: async () => {
    const allKeys = await SecureStore.getItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
    return allKeys ? allKeys.split(spr) : [];
  },
  getAll: async () => {
    const allKeys = await SecureStore.getItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
    if (allKeys) {
      const keys = allKeys.split(spr);
      const values = await Promise.all(keys.map((key) => SecureStore.getItemAsync(key)));
      return keys.map((key, i) => ({ key, value: values[i] }));
    }
    return [];
  },
  deleteAll: async () => {
    const allKeys = await SecureStore.getItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
    if (allKeys) {
      const keys = allKeys.split(spr).filter((k) => !PERMANENT_SECURE_STORE_KEYS.includes(k));
      await Promise.all(keys.map((key) => SecureStore.deleteItemAsync(key)));
    }
    await SecureStore.deleteItemAsync(SECURE_STORE_ALL_KEY_STORE_KEY);
  },
};
